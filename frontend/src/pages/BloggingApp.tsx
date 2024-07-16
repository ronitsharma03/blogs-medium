

const BloggingApp = () => {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <a className="flex items-center justify-center" href="#" rel="ugc">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
          </svg>
          <span className="sr-only">Blogging App</span>
        </a>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <a className="text-sm font-medium hover:underline underline-offset-4" href="#" rel="ugc">
            Features
          </a>
          <a className="text-sm font-medium hover:underline underline-offset-4" href="#" rel="ugc">
            Pricing
          </a>
          <a className="text-sm font-medium hover:underline underline-offset-4" href="#" rel="ugc">
            Blog
          </a>
          <a className="text-sm font-medium hover:underline underline-offset-4" href="#" rel="ugc">
            Contact
          </a>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Unleash Your Creativity with Our Blogging App
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Effortlessly create, manage, and share your content with our powerful blogging platform.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <a
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    href="#"
                    rel="ugc"
                  >
                    Get Started
                  </a>
                  <a
                    className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    href="#"
                    rel="ugc"
                  >
                    Download App
                  </a>
                </div>
              </div>
              <img
                src="/placeholder.svg"
                width="550"
                height="550"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-bottom sm:w-full lg:order-last lg:aspect-square"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Unlock Your Blogging Potential</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our blogging app offers a suite of powerful features to streamline your content creation and management.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Easy Content Management</h3>
                      <p className="text-muted-foreground">
                        Effortlessly create, edit, and publish your blog posts with our intuitive content management system.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">SEO Optimization</h3>
                      <p className="text-muted-foreground">
                        Boost your online visibility with our built-in SEO tools, helping you rank higher in search results.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Community Engagement</h3>
                      <p className="text-muted-foreground">
                        Foster a thriving community with features like comments, social sharing, and user profiles.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <img
                src="/placeholder.svg"
                width="550"
                height="310"
                alt="Features"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>
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
                {[
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
                ].map(({ name, role, feedback }) => (
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
            <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
              <a
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                href="#"
                rel="ugc"
              >
                Sign Up
              </a>
              <a
                className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                href="#"
                rel="ugc"
              >
                Download App
              </a>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">© 2024 Blogging App. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <a className="text-xs hover:underline underline-offset-4" href="#" rel="ugc">
            Terms of Service
          </a>
          <a className="text-xs hover:underline underline-offset-4" href="#" rel="ugc">
            Privacy
          </a>
        </nav>
      </footer>
    </div>
  );
};

export default BloggingApp;
