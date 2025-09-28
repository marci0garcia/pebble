# 🪨 Pebble

**Open-source team collaboration for student organizations on a budget**

## 🎯 Mission

Pebble was born out of necessity at FIU SEDS (Students for the Exploration and Development of Space) when we realized that existing team collaboration tools were simply too expensive for student organizations with limited budgets. Instead of compromising on functionality, we decided to build our own open-source solution that any student organization can use, modify, and contribute to.

## ⚠️ HACKATHON DISCLAIMER

This project is currently in active development for a hackathon. Do not run production deployments yet as the application is not ready for full-scale use. We're building this iteratively and welcome contributions from the community!

## ✨ Why Pebble?

- **100% Free & Open Source** - No subscription fees, no per-user costs
- **Built by Students, for Students** - We understand the unique challenges of student organizations
- **Simple & Focused** - Task management without the bloat of enterprise tools
- **Real-time Collaboration** - See changes instantly across all team members
- **Self-Hostable** - Own your data and control your costs
- **Hackathon Ready** - Built with rapid development and iteration in mind

## 🚀 Features

- **Real-time task collaboration** - See updates instantly across all team members
- **User attribution** - Track who created and completed each task
- **Simple task management** - Add, complete, and delete tasks with ease
- **Responsive design** - Works seamlessly on desktop and mobile
- **Zero setup complexity** - Just enter your name and start collaborating
- **Open source** - Fork, modify, and contribute back to the community

## 🛠 Tech Stack

- **Frontend**: Typescript, JavaScript, Next.Js
- **Database**: Prisma ORM with PostgreSQL
- **Real-time**: WebSocket connections for live updates
- **Hosting**: Vercel
- **Authentication**: Auth0

## 🏗 Current Architecture

```
Frontend (Vanilla JS) → API Layer → Prisma ORM → PostgreSQL Database
                     ↓
               WebSocket Server (Real-time updates)
```

## 📦 Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- npm or yarn

### Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/marci0garcia/pebble.git
   cd pebble
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up your database**

   ```bash
   # Set up your DATABASE_URL in .env file
   echo "DATABASE_URL=postgresql://username:password@localhost:5432/pebble" > .env

   # Run Prisma migrations
   npx prisma migrate dev
   npx prisma generate
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

## 📊 Cost Comparison

| Solution      | Monthly Cost (10 users) | Annual Cost |
| ------------- | ----------------------- | ----------- |
| Asana Premium | $119.90                 | $1,438.80   |
| Monday.com    | $80.00                  | $960.00     |
| Notion Team   | $100.00                 | $1,200.00   |
| **Pebble**    | **$0.00**               | **$0.00**   |

_Self-hosting costs may apply depending on your infrastructure choices_

## 📱 Usage

1. **Join a session** - Enter your name to start collaborating
2. **Add tasks** - Type in the input field and hit Enter or click Add
3. **Complete tasks** - Check the checkbox to mark tasks as done
4. **Delete tasks** - Click the × button to remove tasks
5. **See live updates** - Watch as teammates add and complete tasks in real-time

## 🎯 Roadmap

### Phase 1 (Hackathon MVP)

- [x] Basic task CRUD operations
- [x] Real-time collaboration
- [x] Simple user system
- [x] Prisma database integration
- [x] WebSocket real-time updates

### Phase 2 (Post-Hackathon)

- [x] User authentication with email/password
- [x] Project/workspace separation
- [x] Task assignments and due dates

### Phase 3 (Community Driven)

- [ ] Google Drive integration
- [ ] Email notifications
- [ ] Offline support
- [ ] Custom themes and branding
- [ ] Plugin system
- [ ] Advanced reporting

## 🤝 Contributing

We welcome contributions from student developers and organizations! This project is built by the community, for the community.

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test your changes
5. Commit your changes (`git commit -m 'Add some amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Development Guidelines

- Keep it simple - remember our target users are students with varying technical backgrounds
- Write clear commit messages
- Test your changes locally
- Update documentation when needed

## 🏫 Student Organizations Using Pebble

- **FIU SEDS** (Students for the Exploration and Development of Space) - _Founding organization_
- _Add your organization here by opening a PR!_

## 📄 License

MIT License - Feel free to use, modify, and distribute. See [LICENSE](LICENSE) for details.

## 🙏 Acknowledgments

- **FIU SEDS** - For the inspiration and initial use case
- **The Student Developer Community** - For believing that great tools shouldn't break the bank
- **Open Source Contributors** - This project exists because of your contributions

## 📞 Support & Community

- **Issues**: [GitHub Issues](https://github.com/marci0garcia/pebble/issues)
- **Discussions**: [GitHub Discussions](https://github.com/marci0garcia/pebble/discussions)
- **Email**: mgarc1070@fiu.edu

---

_Built with ❤️ by students, for students. Because great ideas shouldn't be limited by budget constraints._