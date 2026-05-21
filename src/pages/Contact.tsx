import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, Phone, MapPin, Send, MessageSquare, Loader2, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '@/lib/firebase';
import Section, { SectionHeader } from '@/components/ui/Section';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { COMPANY_DETAILS } from '@/constants';

const contactFormSchema = z.z.object({
  name: z.z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.z.string().optional(),
  businessName: z.z.string().optional(),
  service: z.z.string().optional(),
  message: z.z.string().min(10, { message: 'Message must be at least 10 characters.' }),
  consent: z.z.boolean().refine(val => val === true, {
    message: 'You must consent to data processing.',
  }),
});

type ContactFormValues = z.z.infer<typeof contactFormSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      businessName: '',
      service: '',
      message: '',
      consent: false,
    },
  });

  async function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true);
    const path = 'enquiries';
    try {
      await addDoc(collection(db, path), {
        ...data,
        createdAt: serverTimestamp(),
      });
      setIsSuccess(true);
      form.reset();
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <section className="bg-primary/5 py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6">Get in Touch</h1>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
            Have a question or looking to start a partnership? Our team is ready to help you implement your innovation.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            <div className="p-8 bg-card text-card-foreground rounded-3xl shadow-xl space-y-12 border border-border">
              <div>
                <h3 className="text-xl font-bold font-heading mb-6">Contact Information</h3>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center text-secondary shrink-0">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm mb-1">Our Location</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">{COMPANY_DETAILS.location}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center text-secondary shrink-0">
                      <Phone size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm mb-1">Phone / WhatsApp</h4>
                      <p className="text-muted-foreground text-sm">{COMPANY_DETAILS.phone}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center text-secondary shrink-0">
                      <Mail size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm mb-1">Email Address</h4>
                      <p className="text-muted-foreground text-sm break-all">{COMPANY_DETAILS.email}</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold font-heading mb-6">Office Hours</h3>
                <ul className="space-y-3 text-sm text-slate-400">
                  <li className="flex justify-between"><span>Mon - Fri:</span> <span>08:00 - 17:00</span></li>
                  <li className="flex justify-between"><span>Saturday:</span> <span>09:00 - 13:00</span></li>
                  <li className="flex justify-between"><span>Sunday:</span> <span>Closed</span></li>
                </ul>
              </div>
            </div>
            
            {/* Map Placeholder */}
            <div className="aspect-square rounded-3xl bg-muted overflow-hidden relative border border-border/50">
               <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground p-8 text-center bg-[url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=2068&auto=format&fit=crop')] bg-cover opacity-50 grayscale"></div>
               <div className="relative z-10 w-full h-full flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
                  <MapPin size={48} className="text-primary mb-4" />
                  <span className="font-bold uppercase tracking-widest text-[10px]">Upington Office</span>
                  <p className="text-xs px-12 mt-2 leading-relaxed text-center font-medium opacity-70">Northern Cape, South Africa</p>
               </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-background border border-border shadow-sm p-8 md:p-12 rounded-3xl">
              {isSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-24 text-center"
                >
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={48} />
                  </div>
                  <h2 className="text-3xl font-bold mb-4 font-heading">Message Sent!</h2>
                  <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
                    Thank you for reaching out to JJ Multi Solutions. We have received your enquiry and will get back to you shortly.
                  </p>
                  <Button onClick={() => setIsSuccess(false)} variant="outline" className="rounded-full px-10">Send Another Message</Button>
                </motion.div>
              ) : (
                <>
                  <SectionHeader 
                    title="Send Us a Message" 
                    subtitle="Fill out the form below and one of our consultants will be in touch within 24 hours."
                  />
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name*</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address*</FormLabel>
                              <FormControl>
                                <Input placeholder="john@example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input placeholder="073 000 0000" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="businessName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Business/Organisation Name</FormLabel>
                              <FormControl>
                                <Input placeholder="My Company (Pty) Ltd" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="service"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Service Interest</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a service" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Website Development">Website Development</SelectItem>
                                <SelectItem value="App Development">App Development</SelectItem>
                                <SelectItem value="AI Solutions">AI Solutions</SelectItem>
                                <SelectItem value="Rapid Prototyping">Rapid Prototyping</SelectItem>
                                <SelectItem value="Training">Training</SelectItem>
                                <SelectItem value="Innovation Support">Innovation Support</SelectItem>
                                <SelectItem value="Business Consulting">Business Consulting</SelectItem>
                                <SelectItem value="Branding & Marketing">Branding & Marketing</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>How can we help you?*</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Tell us about your project or enquiry..." 
                                className="min-h-[150px] resize-none"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="consent"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 bg-muted/20">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel className="text-xs text-muted-foreground font-medium">
                                I consent to JJ Multi Solutions processing my data in accordance with the Privacy Policy for the purpose of this enquiry.
                              </FormLabel>
                              <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />

                      <Button 
                        type="submit" 
                        className="w-full h-14 rounded-full font-bold text-lg uppercase tracking-widest bg-primary"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2"><Loader2 className="animate-spin" /> Sending...</span>
                        ) : (
                          <span className="flex items-center gap-2">Send Message <Send size={18} /></span>
                        )}
                      </Button>
                    </form>
                  </Form>
                </>
              )}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
