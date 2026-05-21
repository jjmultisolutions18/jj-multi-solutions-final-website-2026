import { 
  collection, 
  getDocs, 
  doc, 
  getDoc, 
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query,
  where,
  orderBy
} from 'firebase/firestore';
import { db } from './firebase';

// Collection for storing linked Google Forms configs
const FORMS_CONFIG_COL = 'googleFormsConfigs';

export interface GoogleFormConfig {
  id: string; // The Firestore doc ID
  formId: string; // The Google Form ID
  title: string;
  responderUri: string; // Public view URL
  syncTarget: 'quotes' | 'tickets'; // Target collection to sync responses to
  syncedResponseIds: string[]; // List of already-integrated responseIds
  createdAt: string;
}

// In-memory OAuth token caching
let cachedFormsAccessToken: string | null = null;

export function setFormsAccessToken(token: string | null) {
  cachedFormsAccessToken = token;
}

export function getFormsAccessToken(): string | null {
  return cachedFormsAccessToken;
}

/**
 * Fetch linked Google Forms from Firestore
 */
export async function getLinkedForms(): Promise<GoogleFormConfig[]> {
  try {
    const snap = await getDocs(collection(db, FORMS_CONFIG_COL));
    const list: GoogleFormConfig[] = [];
    snap.forEach((docRef) => {
      list.push({ id: docRef.id, ...(docRef.data() as any) } as GoogleFormConfig);
    });
    return list;
  } catch (err) {
    console.error('Error fetching linked forms:', err);
    return [];
  }
}

/**
 * Save Google Form Config to Firestore
 */
export async function saveFormConfig(config: Omit<GoogleFormConfig, 'id'>, id?: string): Promise<string> {
  try {
    const finalId = id || 'gform-' + Math.random().toString(36).substring(2, 9);
    const docRef = doc(db, FORMS_CONFIG_COL, finalId);
    await setDoc(docRef, { ...config, id: finalId });
    return finalId;
  } catch (err) {
    console.error('Error saving Google Form configuration:', err);
    throw err;
  }
}

/**
 * Delete a linked Google Form config (only unlinks from our dashboard)
 */
export async function unlinkFormConfig(id: string): Promise<void> {
  try {
    const docRef = doc(db, FORMS_CONFIG_COL, id);
    await deleteDoc(docRef);
  } catch (err) {
    console.error('Error unlinking form config:', err);
    throw err;
  }
}

/**
 * Helper: Create a real Google Form via the Google Forms API
 */
export async function createRealGoogleForm(
  token: string, 
  title: string, 
  description: string
): Promise<{ formId: string; responderUri: string }> {
  const url = 'https://forms.googleapis.com/v1/forms';
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      info: {
        title: title,
        description: description,
        documentTitle: title
      }
    })
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Google Forms API create error: ${response.statusText} (${errText})`);
  }

  const data = await response.json();
  return {
    formId: data.formId,
    responderUri: data.responderUri
  };
}

/**
 * Helper: Add default inquiry/support questions to a created Google Form via batchUpdate
 */
export async function seedFormQuestions(
  token: string,
  formId: string,
  targetType: 'quotes' | 'tickets'
): Promise<void> {
  const url = `https://forms.googleapis.com/v1/forms/${formId}:batchUpdate`;
  
  // Create appropriate questions based on the target collection
  const requests = targetType === 'quotes' 
    ? [
        {
          createItem: {
            item: {
              title: 'Full Name',
              questionItem: {
                question: {
                  required: true,
                  textQuestion: {}
                }
              }
            },
            location: { index: 0 }
          }
        },
        {
          createItem: {
            item: {
              title: 'Company / Business Name',
              questionItem: {
                question: {
                  required: true,
                  textQuestion: {}
                }
              }
            },
            location: { index: 1 }
          }
        },
        {
          createItem: {
            item: {
              title: 'Email Address',
              questionItem: {
                question: {
                  required: true,
                  textQuestion: {}
                }
              }
            },
            location: { index: 2 }
          }
        },
        {
          createItem: {
            item: {
              title: 'Phone Number',
              questionItem: {
                question: {
                  required: false,
                  textQuestion: {}
                }
              }
            },
            location: { index: 3 }
          }
        },
        {
          createItem: {
            item: {
              title: 'Services or Solutions required (e.g., Cloud Backup, Microsoft 365, Fibre)',
              questionItem: {
                question: {
                  required: true,
                  textQuestion: {}
                }
              }
            },
            location: { index: 4 }
          }
        },
        {
          createItem: {
            item: {
              title: 'Message and details on specific business requirements',
              questionItem: {
                question: {
                  required: false,
                  textQuestion: { paragraph: true }
                }
              }
            },
            location: { index: 5 }
          }
        }
      ]
    : [
        {
          createItem: {
            item: {
              title: 'Full Name',
              questionItem: {
                question: {
                  required: true,
                  textQuestion: {}
                }
              }
            },
            location: { index: 0 }
          }
        },
        {
          createItem: {
            item: {
              title: 'Email Address',
              questionItem: {
                question: {
                  required: true,
                  textQuestion: {}
                }
              }
            },
            location: { index: 1 }
          }
        },
        {
          createItem: {
            item: {
              title: 'Ticket Subject',
              questionItem: {
                question: {
                  required: true,
                  textQuestion: {}
                }
              }
            },
            location: { index: 2 }
          }
        },
        {
          createItem: {
            item: {
              title: 'Problem Description / Details',
              questionItem: {
                question: {
                  required: true,
                  textQuestion: { paragraph: true }
                }
              }
            },
            location: { index: 3 }
          }
        },
        {
          createItem: {
            item: {
              title: 'Category',
              questionItem: {
                question: {
                  required: true,
                  choiceQuestion: {
                    type: 'RADIO',
                    options: [
                      { value: 'Technical' },
                      { value: 'Billing' },
                      { value: 'General' }
                    ]
                  }
                }
              }
            },
            location: { index: 4 }
          }
        }
      ];

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ requests })
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Google Forms batchUpdate question seeding error: ${response.statusText} (${errText})`);
  }
}

/**
 * Fetch a single Google Form body structure
 */
export async function getGoogleFormStructure(token: string, formId: string): Promise<any> {
  const url = `https://forms.googleapis.com/v1/forms/${formId}`;
  
  const response = await fetch(url, {
    headers: { 'Authorization': `Bearer ${token}` }
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Failed to load Google Form details: ${response.statusText} (${errText})`);
  }

  return response.json();
}

/**
 * Fetch responses submitted to a Google Form
 */
export async function getGoogleFormResponses(token: string, formId: string): Promise<any[]> {
  const url = `https://forms.googleapis.com/v1/forms/${formId}/responses`;
  
  try {
    const response = await fetch(url, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (response.status === 404) {
      // No responses or not found
      return [];
    }

    if (!response.ok) {
      const errText = await response.text();
      // Handle permission/scopes issues gracefully
      if (errText.includes('auth') || response.status === 403) {
        throw new Error('Permission denied. Make sure the Google Account owns this form and has given responses scope.');
      }
      throw new Error(`Failed to load Google Form responses: ${response.statusText} (${errText})`);
    }

    const data = await response.json();
    return data.responses || [];
  } catch (err: any) {
    console.error('Error loading Google Form responses:', err);
    throw err;
  }
}
