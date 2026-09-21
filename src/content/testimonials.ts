/**
 * brief §8.13. Only two real, attributed testimonials exist anywhere in the
 * client's material — Dr Althea Morrison (CMU) and Sam (J&A Freight Systems).
 * The third quote is real text from the legacy site but arrived with no name
 * attached; it ships with attribution withheld rather than invented.
 * See docs/client-questions.md #6. NEVER add "Poly Dem / Robin Ton / Magar Faw"
 * — those are theme-demo placeholders that appeared on the legacy About page.
 */
export interface Testimonial {
  quote: string;
  author: string | null;
  role: string | null;
  org: string | null;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "Flat Bridge Ltd. has been an awesome company providing internship, employment opportunities and career development for our CMU students. I am happy that we had forged this partnership and for future development within international borders.",
    author: "Dr. Althea Morrison",
    role: null,
    org: "Caribbean Maritime University",
  },
  {
    quote:
      "The Flat Bridge Team inspires trust with their customers and carriers as they attentively oversee the secure and safe handling of freight throughout the shipment process. They provide clear and reliable communication with all parties involved to ensure efficient transportation of goods, as well as foster an environment that allows all employees to continually learn new roles and increase their customer-oriented service capabilities.",
    author: null,
    role: null,
    org: null,
  },
  {
    quote:
      "Flat Bridge has become an invaluable extension of our team. Their dedication to our success, industry expertise, and seamless execution of tasks have enabled us to scale our business and focus on strategic growth initiatives. We wholeheartedly recommend Flat Bridge to any freight brokerage looking to enhance their operations and elevate their customer experience.",
    author: "Sam",
    role: "Director of Business Development",
    org: "J&A Freight Systems",
  },
];
