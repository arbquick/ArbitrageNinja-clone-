import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MessageSquare, Send, AlertCircle, Check } from "lucide-react";

export function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    
    // Simulate form submission with a timeout
    setTimeout(() => {
      setFormStatus("success");
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    }, 1500);
  };
  
  return (
    <section id="contact" className="py-20 relative overflow-hidden bg-black">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-20" 
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(47, 182, 252, 0.07) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(47, 182, 252, 0.07) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      ></div>
      
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-[#2FB6FC]/10 blur-[100px]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-[#2FB6FC]">
              Get In Touch
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Have questions about arbitrage trading or our platform? Our team is here to help.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
                <p className="text-gray-300 leading-relaxed mb-8">
                  Our support team is available to assist you with any questions regarding arbitrage trading, platform features, or technical assistance.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-[#2FB6FC]/10 flex items-center justify-center text-[#2FB6FC] flex-shrink-0 mt-1">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Email Us</h4>
                    <p className="text-gray-300">support@cryptoarb.com</p>
                    <p className="text-gray-400 text-sm mt-1">We respond within 24 hours</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-[#2FB6FC]/10 flex items-center justify-center text-[#2FB6FC] flex-shrink-0 mt-1">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Live Chat</h4>
                    <p className="text-gray-300">Available for premium users</p>
                    <p className="text-gray-400 text-sm mt-1">Mon-Fri, 9AM-5PM EST</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-8 border-t border-gray-800">
                <h4 className="text-white font-medium mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 rounded-lg bg-[#2FB6FC]/10 flex items-center justify-center text-[#2FB6FC] hover:bg-[#2FB6FC]/20 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-lg bg-[#2FB6FC]/10 flex items-center justify-center text-[#2FB6FC] hover:bg-[#2FB6FC]/20 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-lg bg-[#2FB6FC]/10 flex items-center justify-center text-[#2FB6FC] hover:bg-[#2FB6FC]/20 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-lg bg-[#2FB6FC]/10 flex items-center justify-center text-[#2FB6FC] hover:bg-[#2FB6FC]/20 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-3"
          >
            <div className="bg-[#111]/70 backdrop-blur-md border border-gray-800 rounded-2xl p-6 md:p-8">
              <h3 className="text-xl font-bold text-white mb-6">Send Us a Message</h3>
              
              {formStatus === "success" ? (
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                    <Check className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Message Sent Successfully!</p>
                    <p className="text-gray-300 text-sm">We'll get back to you as soon as possible.</p>
                  </div>
                </div>
              ) : formStatus === "error" ? (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-center space-x-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-500">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Error Sending Message</p>
                    <p className="text-gray-300 text-sm">Please try again later.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-gray-300 text-sm font-medium mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg bg-black/30 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#2FB6FC] focus:border-transparent transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg bg-black/30 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#2FB6FC] focus:border-transparent transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-gray-300 text-sm font-medium mb-2">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-black/30 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#2FB6FC] focus:border-transparent transition-colors"
                    >
                      <option value="" disabled>Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="billing">Billing & Subscription</option>
                      <option value="partnership">Partnership Opportunity</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-gray-300 text-sm font-medium mb-2">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg bg-black/30 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#2FB6FC] focus:border-transparent transition-colors"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={formStatus === "submitting"}
                    className={`w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-lg bg-[#2FB6FC] text-white font-medium transition-all ${
                      formStatus === "submitting" 
                        ? "opacity-70 cursor-not-allowed" 
                        : "hover:bg-[#2FB6FC]/90 hover:shadow-[0_0_20px_rgba(47,182,252,0.4)]"
                    }`}
                  >
                    {formStatus === "submitting" ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 