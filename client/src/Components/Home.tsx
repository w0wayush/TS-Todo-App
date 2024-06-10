const Home = () => {
  return (
    <div className="homepage">
      <header className="header">
        <h1>Welcome to {"<w0w-todo />"}</h1>
        <p>Your personal productivity booster!</p>
      </header>
      <section className="benefits">
        <h2>Why Use w0w-todo?</h2>
        <div className="benefits-list">
          <div className="benefit-item">
            <img
              src="https://i.pinimg.com/564x/14/c8/96/14c896188db928e5090ced98393719df.jpg"
              alt="Organize your tasks"
            />
            <h3>Organize Your Tasks</h3>
            <p>Keep all your tasks in one place and stay organized.</p>
          </div>
          <div className="benefit-item">
            <img
              src="https://i.pinimg.com/564x/fd/0f/46/fd0f469de747c3998582d1a499b2d1a1.jpg"
              alt="Stay Productive"
            />
            <h3>Stay Productive</h3>
            <p>Boost your productivity by focusing on what matters.</p>
          </div>
          <div className="benefit-item">
            <img
              src="https://i.pinimg.com/564x/98/3d/1c/983d1c0c500c771c15267fd37d61cab1.jpg"
              alt="Achieve Your Goals"
            />
            <h3>Achieve Your Goals</h3>
            <p>Set goals and track your progress with ease.</p>
          </div>
          <div className="benefit-item">
            <img
              src="https://i.pinimg.com/736x/b8/b7/cd/b8b7cda9fc91780a54cd6f33d66f396b.jpg"
              alt="Collaborate with Team"
            />
            <h3>Collaborate with Team</h3>
            <p>Share your tasks and collaborate with your team effortlessly.</p>
          </div>
          <div className="benefit-item">
            <img
              src="https://i.pinimg.com/564x/4d/4e/bc/4d4ebc55df98a74d10cf19138b2bf3ee.jpg"
              alt="Reminders"
            />
            <h3>Set Reminders</h3>
            <p>Never miss a deadline with customizable reminders.</p>
          </div>
          <div className="benefit-item">
            <img
              src="https://i.pinimg.com/564x/1f/89/65/1f8965987d91733babdd052543a85491.jpg"
              alt="Track Time"
            />
            <h3>Track Time</h3>
            <p>Monitor the time spent on each task to improve efficiency.</p>
          </div>
        </div>
      </section>
      <footer className="footer">
        <p>©2024 ayushw0w. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
