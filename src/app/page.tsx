"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function Home() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    partySize: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          date: date?.toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric',
            year: 'numeric'
          }),
        }),
      });
      
      if (!response.ok) throw new Error('Failed to submit');
      
      setSubmitted(true);
    } catch (error) {
      alert('Something went wrong. Please try again or call us directly!');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <span className="text-2xl">🎯</span>
            </div>
            <span className="font-bold text-xl">Robison Party Services</span>
          </a>
          <nav className="hidden md:flex gap-6">
            <a href="#services" className="hover:text-primary transition-colors">Services</a>
            <a href="#how-it-works" className="hover:text-primary transition-colors">How It Works</a>
            <a href="#book" className="hover:text-primary transition-colors">Book Now</a>
          </nav>
          <Button asChild>
            <a href="#book">Book Now</a>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-hero-pattern py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Epic Nerf Battles for Your
            <span className="text-gradient block">Next Party!</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            We bring the action to you! 25 Nerf guns, safety glasses, and all the fun—delivered 
            anywhere from Salt Lake to Provo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="text-lg px-8">
              <a href="#book">Book Your Party - $40</a>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg px-8">
              <a href="#how-it-works">Learn More</a>
            </Button>
          </div>
          
          {/* Trust badges */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="text-2xl">✓</span>
              <span>25 Nerf Guns Included</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">✓</span>
              <span>Safety Glasses Provided</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">✓</span>
              <span>We Deliver & Pick Up</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Our Nerf Party Package
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
            Everything you need for an unforgettable Nerf battle experience
          </p>
          
          <div className="max-w-lg mx-auto">
            <Card className="border-2 border-primary shadow-xl">
              <CardHeader className="text-center pb-2">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-5xl">🔫</span>
                </div>
                <CardTitle className="text-2xl">Nerf Arsenal Package</CardTitle>
                <CardDescription>Perfect for birthdays, team events, and parties</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-5xl font-bold text-primary mb-6">$40</div>
                <ul className="text-left space-y-3 mb-8">
                  <li className="flex items-center gap-3">
                    <span className="text-primary text-xl">✓</span>
                    <span>25 Nerf guns (variety of styles)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-primary text-xl">✓</span>
                    <span>Safety glasses for all participants</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-primary text-xl">✓</span>
                    <span>Plenty of Nerf darts</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-primary text-xl">✓</span>
                    <span>Free delivery & pickup</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-primary text-xl">✓</span>
                    <span>All-day rental</span>
                  </li>
                </ul>
                <Button size="lg" className="w-full text-lg" asChild>
                  <a href="#book">Book Now</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            How It Works
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
            Getting your Nerf party started is easy
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Pick Your Date</h3>
              <p className="text-muted-foreground">
                Choose your party date using our booking calendar below
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">We Deliver</h3>
              <p className="text-muted-foreground">
                We bring all 25 guns, safety gear, and darts to your location
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Battle Time!</h3>
              <p className="text-muted-foreground">
                Have an epic Nerf war, then we pick everything up
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="book" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Book Your Nerf Party
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
            Select your date and fill out the form—we&apos;ll confirm within 24 hours
          </p>
          
          {submitted ? (
            <Card className="max-w-lg mx-auto text-center p-8">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold mb-2">Booking Request Sent!</h3>
              <p className="text-muted-foreground mb-4">
                We&apos;ll confirm your party date within 24 hours. Get ready for an epic Nerf battle!
              </p>
              <Button onClick={() => setSubmitted(false)}>Book Another Date</Button>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Calendar */}
              <Card>
                <CardHeader>
                  <CardTitle>Select Date</CardTitle>
                  <CardDescription>Choose your party date</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(date) => date < new Date()}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>
              
              {/* Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Details</CardTitle>
                  <CardDescription>
                    {date ? `Party date: ${date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}` : 'Select a date first'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="(801) 555-1234"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Delivery Address *</Label>
                      <Input
                        id="address"
                        required
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        placeholder="123 Main St, City, UT"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="partySize">Estimated Party Size</Label>
                      <Input
                        id="partySize"
                        value={formData.partySize}
                        onChange={(e) => setFormData({ ...formData, partySize: e.target.value })}
                        placeholder="e.g., 15 kids"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="notes">Special Requests</Label>
                      <Textarea
                        id="notes"
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="Any special requests or questions?"
                        rows={3}
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full" 
                      size="lg"
                      disabled={!date || isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Request Booking - $40"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>

      {/* Service Area */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Service Area</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            We deliver anywhere from <strong>Salt Lake City</strong> to <strong>Provo</strong> and 
            everywhere in between—including Draper, Sandy, Lehi, American Fork, Orem, and more!
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <a href="/" className="flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-lg">🎯</span>
                </div>
                <span className="font-bold text-lg">Robison Party Services</span>
              </a>
              <p className="text-background/70">
                Making parties epic with Nerf battles across the Wasatch Front.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-background/70">
                <li><a href="#services" className="hover:text-primary transition-colors">Services</a></li>
                <li><a href="#how-it-works" className="hover:text-primary transition-colors">How It Works</a></li>
                <li><a href="#book" className="hover:text-primary transition-colors">Book Now</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-background/70">
                <li>Salt Lake City to Provo, UT</li>
                <li>
                  <a href="mailto:robisonfam03@gmail.com" className="hover:text-primary transition-colors">
                    robisonfam03@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-background/20 mt-8 pt-8 text-center text-background/50">
            © {new Date().getFullYear()} Robison Party Services. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
