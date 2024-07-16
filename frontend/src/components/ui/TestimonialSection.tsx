

const testimonials = [
  {
    name: "Jane Doe",
    role: "Freelance Writer",
    feedback: "This blogging app has been a game-changer for my business. The easy-to-use features and powerful capabilities have helped me streamline my content creation and reach a wider audience.",
  },
  {
    name: "John Smith",
    role: "Small Business Owner",
    feedback: "I was hesitant to try a new blogging platform, but this app has exceeded my expectations. The SEO tools have helped me reach more customers, and the community features have been invaluable for engaging with my audience.",
  },
  {
    name: "Sarah Lee",
    role: "Lifestyle Blogger",
    feedback: "I love how intuitive and user-friendly this blogging app is. The content management tools make it a breeze to publish high-quality posts, and the analytics help me understand my audience better.",
  },
];

const TestimonialsSection = () => (
  <section className="w-full py-12 md:py-24 lg:py-32">
    <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
      <div className="space-y-3">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What Our Users Say</h2>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Hear from our satisfied customers about their experience with our blogging app.
        </p>
      </div>
      <div className="divide-y rounded-lg border">
        <div className="grid w-full grid-cols-1 items-stretch justify-center divide-x md:grid-cols-3">
          {testimonials.map(({ name, role, feedback }) => (
            <div key={name} className="mx-auto flex w-full flex-col items-center justify-center p-4 sm:p-8 space-y-4">
              <img
                src="/placeholder.svg"
                width="64"
                height="64"
                alt="Avatar"
                className="rounded-full"
                style={{ aspectRatio: '64 / 64', objectFit: 'cover' }}
              />
              <div className="text-center">
                <div className="text-lg font-bold">{name}</div>
                <div className="text-sm text-muted-foreground">{role}</div>
              </div>
              <p className="text-sm text-muted-foreground">{feedback}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
