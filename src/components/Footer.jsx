function Footer() {
  return (
    <footer className="page-footer">
      <div className="container">
        © {new Date().getFullYear()} Copyright Orsa 🐺
        <a className="right" href="https://github.com/GattaGizmo/edu-react-shop" rel="noreferrer" target="_blank">
          Repo
        </a>
      </div>
    </footer>
  );
}

export { Footer };
