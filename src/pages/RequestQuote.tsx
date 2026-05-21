import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, CheckCircle2, FileText, Globe, Cpu, Lightbulb, Settings, Briefcase, Palette, ArrowRight, Package, Server, Printer, Network, GraduationCap, Code, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '@/lib/firebase';
import Section from '@/components/ui/Section';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const quoteFormSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name must be at least 2 characters.' }),
  businessName: z.string().optional(),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().min(10, { message: 'Phone number is required.' }),
  serviceRequired: z.string().min(1, { message: 'Please select a service.' }),
  budgetRange: z.string().optional(),
  timeline: z.string().optional(),
  projectDescription: z.string().min(20, { message: 'Please provide more details (min 20 chars).' }),
  preferredContact: z.enum(['email', 'phone', 'whatsapp']),
  consent: z.boolean().refine(val => val === true, {
    message: 'You must consent to data processing.',
  }),
});

type QuoteFormValues = z.infer<typeof quoteFormSchema>;

export default function RequestQuote() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const form = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      fullName: '',
      businessName: '',
      email: '',
      phone: '',
      serviceRequired: '',
      budgetRange: '',
      timeline: '',
      projectDescription: '',
      preferredContact: 'email',
      consent: false,
    },
  });

  async function onSubmit(data: QuoteFormValues) {
    setIsSubmitting(true);
    const path = 'quoteRequests';
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

  const serviceCategories = [
    { icon: Lightbulb, val: 'Innovation & Ecosystem', label: 'Innovation & Ecosystem' },
    { icon: Settings, val: 'Rapid Prototyping', label: 'Rapid Prototyping' },
    { icon: Network, val: 'ICT Infrastructure', label: 'ICT Infrastructure' },
    { icon: Server, val: 'Hosting & Domains', label: 'Hosting & Domains' },
    { icon: Code, val: 'Digital Systems', label: 'Digital Systems' },
    { icon: Globe, val: 'Website Development', label: 'Website Development' },
    { icon: Palette, val: 'Branding & Design', label: 'Branding & Design' },
    { icon: Printer, val: 'Printing & Production', label: 'Printing & Production' },
    { icon: GraduationCap, val: 'Training & Skills', label: 'Training & Skills' },
    { icon: Zap, val: 'AI & Smart Infra', label: 'AI & Smart Infra' },
    { icon: Package, val: 'Software & Licensing', label: 'Software & Licensing' },
  ];

  function Bot(props: any) { return <Cpu {...props} />; } // Helper

  return (
    <>
      <section className="bg-muted/30 text-foreground py-24 relative overflow-hidden border-b border-border">
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary-blue to-transparent opacity-20"></div>
        <div className="container mx-auto px-4 text-center relative z-10 pt-10">
          <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6 tracking-tight text-foreground">Request a Quote</h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Ready to bring your idea to life? Provide us with some details about your project and we'll prepare a custom proposal for you.
          </p>
        </div>
      </section>

      <Section>
        <div className="max-w-4xl mx-auto">
          <div className="bg-background border border-border shadow-2xl p-8 md:p-16 rounded-[2.5rem]">
            {isSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-24 text-center"
              >
                <div className="w-24 h-24 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                  <CheckCircle2 size={56} />
                </div>
                <h2 className="text-4xl font-bold mb-4 font-heading">Quote Request Received!</h2>
                <p className="text-muted-foreground text-xl mb-12 max-w-md mx-auto font-medium">
                  Thank you for trust. A consultant will review your specifications and contact you shortly with a personalized proposal.
                </p>
                <Button onClick={() => setIsSuccess(false)} variant="outline" className="rounded-full px-12 h-12 font-bold uppercase tracking-widest text-xs">New Quote Request</Button>
              </motion.div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
                  {/* Basic Info */}
                  <div className="space-y-8">
                    <h3 className="text-2xl font-bold font-heading flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-xs">1</div>
                      Client Information
                    </h3>
                    <div className="grid md:grid-cols-2 gap-8">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name*</FormLabel>
                            <FormControl>
                              <Input placeholder="Jerome V." {...field} className="h-12 border-muted-foreground/20 focus-visible:ring-primary" />
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
                              <Input placeholder="Company Name" {...field} className="h-12 border-muted-foreground/20" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address*</FormLabel>
                            <FormControl>
                              <Input placeholder="email@address.com" {...field} className="h-12 border-muted-foreground/20" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number*</FormLabel>
                            <FormControl>
                              <Input placeholder="073 123 4567" {...field} className="h-12 border-muted-foreground/20" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="space-y-8">
                    <h3 className="text-2xl font-bold font-heading flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-xs">2</div>
                      Project Specifications
                    </h3>
                    
                    <FormField
                      control={form.control}
                      name="serviceRequired"
                      render={({ field }) => (
                        <FormItem className="space-y-4">
                          <FormLabel>Select Service Category*</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="grid grid-cols-2 md:grid-cols-3 gap-3"
                            >
                              {serviceCategories.map((cat) => (
                                <FormItem key={cat.val}>
                                  <FormControl>
                                    <RadioGroupItem value={cat.val} className="sr-only" />
                                  </FormControl>
                                  <FormLabel
                                    className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                      field.value === cat.val 
                                        ? "border-primary bg-primary/5 text-primary" 
                                        : "border-muted bg-background hover:border-primary/50 text-muted-foreground"
                                    }`}
                                  >
                                    <cat.icon size={24} className="mb-2" />
                                    <span className="text-[10px] uppercase font-bold tracking-tight text-center leading-tight">{cat.label}</span>
                                  </FormLabel>
                                </FormItem>
                              ))}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid md:grid-cols-2 gap-8">
                      <FormField
                        control={form.control}
                        name="budgetRange"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Estimated Budget Range</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-12 border-muted-foreground/20">
                                  <SelectValue placeholder="Select a range" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Below R5,000">Below R5,000</SelectItem>
                                <SelectItem value="R5,000 - R15,000">R5,000 - R15,000</SelectItem>
                                <SelectItem value="R15,000 - R50,000">R15,000 - R50,000</SelectItem>
                                <SelectItem value="R50,000+">R50,000+</SelectItem>
                                <SelectItem value="To be discussed">To be discussed</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="timeline"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Preferred Timeline</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-12 border-muted-foreground/20">
                                  <SelectValue placeholder="Select a period" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="ASAP / Urgent">ASAP / Urgent</SelectItem>
                                <SelectItem value="1 - 3 Months">1 - 3 Months</SelectItem>
                                <SelectItem value="3 - 6 Months">3 - 6 Months</SelectItem>
                                <SelectItem value="Flexible">Flexible</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="projectDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Detailed Project Description*</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Please describe your goals, required features, and any existing infrastructure..." 
                              className="min-h-[150px] border-muted-foreground/20 resize-none p-4"
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription className="text-[10px]">Provide as much detail as possible for an accurate quote.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Preferences */}
                  <div className="space-y-8">
                    <h3 className="text-2xl font-bold font-heading flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-xs">3</div>
                      Communication
                    </h3>
                    <FormField
                      control={form.control}
                      name="preferredContact"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Preferred Contact Method</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex gap-8"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl><RadioGroupItem value="email" /></FormControl>
                                <FormLabel className="font-medium">Email</FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl><RadioGroupItem value="phone" /></FormControl>
                                <FormLabel className="font-medium">Phone Call</FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl><RadioGroupItem value="whatsapp" /></FormControl>
                                <FormLabel className="font-medium">WhatsApp</FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="consent"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-2xl border p-6 bg-muted/20">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-sm font-medium">
                              Confirm Information Accuracy
                            </FormLabel>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              I confirm the information provided is accurate and consent to JJ Multi Solutions processing my data for this request.
                            </p>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-16 rounded-full font-bold text-xl uppercase tracking-widest shadow-lg shadow-primary/20 bg-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2"><Loader2 className="animate-spin" /> Submitting Specs...</span>
                    ) : (
                      <span className="flex items-center gap-2">Submit Request <ArrowRight size={20} /></span>
                    )}
                  </Button>
                </form>
              </Form>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}
