

const Footer = () => (
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
);

export default Footer;
