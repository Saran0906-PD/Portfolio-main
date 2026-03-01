import {
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // collect form data
    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value,
    };

    try {
      const response = await fetch(
        "https://6pim2ldasb.execute-api.ap-south-1.amazonaws.com/prod/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        toast({
          title: "Message sent ",
          description: "Your message has been sent successfully!",
        });

        e.target.reset();
      } else {
        toast({
          title: "Error ",
          description: "Failed to send message",
        });
      }

    } catch (error) {
      console.error(error);

      toast({
        title: "Error ",
        description: "Something went wrong. Please try again.",
      });
    }

    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">

        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Get In <span className="text-primary">Touch</span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Have a project in mind? Feel free to contact me.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* LEFT SIDE */}
          <div className="space-y-8">

            <div className="flex items-center space-x-4">
              <Mail className="text-primary"/>
              <span>saranytperiyasamy@gmail.com</span>
            </div>

            <div className="flex items-center space-x-4">
              <Phone className="text-primary"/>
              <span>+91 9361073279</span>
            </div>

            <div className="flex items-center space-x-4">
              <MapPin className="text-primary"/>
              <span>Vellore, Tamil Nadu</span>
            </div>

            <div className="flex space-x-4">
              <a href="https://linkedin.com" target="_blank">
                <Linkedin/>
              </a>
              <a href="https://instagram.com" target="_blank">
                <Instagram/>
              </a>
            </div>

          </div>

          {/* RIGHT SIDE FORM */}
          <div className="bg-card p-8 rounded-lg shadow-xs">

            <h3 className="text-2xl font-semibold mb-6">
              Send Message
            </h3>

            <form className="space-y-6" onSubmit={handleSubmit}>

              <input
                type="text"
                name="name"
                required
                placeholder="Your Name"
                className="w-full px-4 py-3 border rounded-md"
              />

              <input
                type="email"
                name="email"
                required
                placeholder="Your Email"
                className="w-full px-4 py-3 border rounded-md"
              />

              <textarea
                name="message"
                required
                placeholder="Your Message"
                className="w-full px-4 py-3 border rounded-md"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "cosmic-button w-full flex items-center justify-center gap-2"
                )}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send size={16}/>
              </button>

            </form>

          </div>

        </div>
      </div>
    </section>
  );
};