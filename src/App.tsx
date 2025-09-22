import React, { useState, useEffect } from 'react';
import { Users, Calendar, Briefcase, Award, Search, Plus, Edit, Eye, Phone, Mail, Linkedin, Globe, MapPin, Building, GraduationCap, Star, Trophy, Target, TrendingUp, Activity, Bell, Settings, LogOut, User, Filter, X } from 'lucide-react';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  role: 'admin' | 'alumni' | 'student' | 'recruiter';
  college?: string;
  batch?: string;
  domain?: string;
  company?: string;
  location?: string;
  skills?: string[];
  experience?: string;
  phone?: string;
  linkedin?: string;
  website?: string;
  points?: number;
  achievements?: string[];
  mentoring?: boolean;
}

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  organizer: string;
  attendees: number;
  maxAttendees: number;
  points: number;
}

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  domain: string;
  description: string;
  requirements: string[];
  postedBy: string;
  postedDate: string;
}

interface NewsItem {
  id: number;
  title: string;
  content: string;
  date: string;
  author: string;
}

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: 'John Doe',
      username: 'admin',
      email: 'admin@college.edu',
      role: 'admin',
      college: 'MIT',
      batch: '2020',
      domain: 'Computer Science',
      company: 'Tech Corp',
      location: 'Boston, MA',
      skills: ['Leadership', 'Management', 'Strategy'],
      experience: '5+ years in administration',
      phone: '+1-555-0101',
      linkedin: 'linkedin.com/in/johndoe',
      website: 'johndoe.com'
    },
    {
      id: 2,
      name: 'Alice Smith',
      username: 'alice',
      email: 'alice@college.edu',
      role: 'alumni',
      college: 'MIT',
      batch: '2018',
      domain: 'Software Engineering',
      company: 'Google',
      location: 'San Francisco, CA',
      skills: ['React', 'Node.js', 'Python', 'Machine Learning'],
      experience: '6 years in software development',
      phone: '+1-555-0102',
      linkedin: 'linkedin.com/in/alicesmith',
      website: 'alicesmith.dev',
      points: 1250,
      achievements: ['Top Contributor', 'Mentor of the Year', 'Innovation Award'],
      mentoring: true
    },
    {
      id: 3,
      name: 'Bob Johnson',
      username: 'bob',
      email: 'bob@college.edu',
      role: 'student',
      college: 'MIT',
      batch: '2024',
      domain: 'Data Science',
      skills: ['Python', 'SQL', 'Machine Learning', 'Statistics'],
      experience: 'Intern at DataCorp',
      phone: '+1-555-0103',
      linkedin: 'linkedin.com/in/bobjohnson'
    },
    {
      id: 4,
      name: 'Carol Wilson',
      username: 'carol',
      email: 'carol@techcorp.com',
      role: 'recruiter',
      company: 'TechCorp',
      location: 'New York, NY',
      skills: ['Talent Acquisition', 'HR Management', 'Interviewing'],
      experience: '8 years in recruitment',
      phone: '+1-555-0104',
      linkedin: 'linkedin.com/in/carolwilson',
      website: 'techcorp.com'
    },
    {
      id: 5,
      name: 'David Brown',
      username: 'david',
      email: 'david@college.edu',
      role: 'alumni',
      college: 'Stanford',
      batch: '2019',
      domain: 'Product Management',
      company: 'Apple',
      location: 'Cupertino, CA',
      skills: ['Product Strategy', 'Agile', 'User Research'],
      experience: '5 years in product management',
      phone: '+1-555-0105',
      linkedin: 'linkedin.com/in/davidbrown',
      points: 980,
      achievements: ['Product Excellence', 'Team Leader'],
      mentoring: false
    },
    {
      id: 6,
      name: 'Emma Davis',
      username: 'emma',
      email: 'emma@college.edu',
      role: 'student',
      college: 'Stanford',
      batch: '2025',
      domain: 'Computer Science',
      skills: ['Java', 'C++', 'Algorithms', 'System Design'],
      experience: 'Research Assistant',
      phone: '+1-555-0106',
      linkedin: 'linkedin.com/in/emmadavis'
    }
  ]);

  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: 'Alumni Networking Night',
      date: '2024-02-15',
      time: '18:00',
      location: 'Campus Center',
      description: 'Connect with fellow alumni and current students',
      organizer: 'Alumni Association',
      attendees: 45,
      maxAttendees: 100,
      points: 50
    },
    {
      id: 2,
      title: 'Tech Career Fair',
      date: '2024-02-20',
      time: '10:00',
      location: 'Main Auditorium',
      description: 'Meet top tech companies and explore career opportunities',
      organizer: 'Career Services',
      attendees: 120,
      maxAttendees: 200,
      points: 75
    },
    {
      id: 3,
      title: 'Mentorship Program Launch',
      date: '2024-02-25',
      time: '14:00',
      location: 'Student Union',
      description: 'Launch of the new alumni-student mentorship program',
      organizer: 'Student Affairs',
      attendees: 30,
      maxAttendees: 50,
      points: 100
    }
  ]);

  const [jobs, setJobs] = useState<Job[]>([
    {
      id: 1,
      title: 'Senior Software Engineer',
      company: 'Google',
      location: 'Mountain View, CA',
      salary: '$150,000 - $200,000',
      domain: 'Software Engineering',
      description: 'Join our team to build next-generation applications',
      requirements: ['5+ years experience', 'React', 'Node.js', 'Python'],
      postedBy: 'Alice Smith',
      postedDate: '2024-01-15'
    },
    {
      id: 2,
      title: 'Product Manager',
      company: 'Apple',
      location: 'Cupertino, CA',
      salary: '$130,000 - $180,000',
      domain: 'Product Management',
      description: 'Lead product strategy for consumer electronics',
      requirements: ['3+ years PM experience', 'Technical background', 'Leadership skills'],
      postedBy: 'David Brown',
      postedDate: '2024-01-20'
    },
    {
      id: 3,
      title: 'Data Scientist',
      company: 'Microsoft',
      location: 'Seattle, WA',
      salary: '$120,000 - $160,000',
      domain: 'Data Science',
      description: 'Analyze large datasets to drive business insights',
      requirements: ['Python', 'SQL', 'Machine Learning', 'Statistics'],
      postedBy: 'Tech Recruiter',
      postedDate: '2024-01-25'
    }
  ]);

  const [news, setNews] = useState<NewsItem[]>([]);
  const [weather, setWeather] = useState({ temp: 22, condition: 'Sunny' });

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showJobModal, setShowJobModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // Form states
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [registerForm, setRegisterForm] = useState({
    name: '', username: '', email: '', password: '', role: 'alumni' as User['role'],
    college: '', batch: '', domain: ''
  });
  const [newUserForm, setNewUserForm] = useState({
    name: '', username: '', email: '', password: '', role: 'alumni' as User['role'],
    college: '', batch: '', domain: '', company: '', location: '', skills: '', experience: '',
    phone: '', linkedin: '', website: ''
  });
  const [newEventForm, setNewEventForm] = useState({
    title: '', date: '', time: '', location: '', description: '', maxAttendees: 50, points: 25
  });
  const [newJobForm, setNewJobForm] = useState({
    title: '', company: '', location: '', salary: '', domain: '', description: '', requirements: ''
  });

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDomain, setFilterDomain] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterCollege, setFilterCollege] = useState('');
  const [currentView, setCurrentView] = useState('dashboard');

  useEffect(() => {
    fetchNews();
    fetchWeather();
  }, []);

  const fetchNews = async () => {
    try {
      // Mock news data since there's no API endpoint
      const mockNews = [
        {
          id: 1,
          title: 'Alumni Networking Event Success',
          content: 'Over 100 alumni and students attended our recent networking event, creating valuable connections.',
          date: '2024-01-30',
          author: 'Alumni Association'
        },
        {
          id: 2,
          title: 'New Mentorship Program Launched',
          content: 'We are excited to announce the launch of our new alumni-student mentorship program.',
          date: '2024-01-28',
          author: 'Student Affairs'
        },
        {
          id: 3,
          title: 'Career Fair Registration Open',
          content: 'Registration is now open for the upcoming tech career fair featuring top companies.',
          date: '2024-01-25',
          author: 'Career Services'
        }
      ];
      setNews(mockNews);
    } catch (error) {
      console.error('Error fetching news:', error);
      setNews([]);
    }
  };

  const fetchWeather = async () => {
    try {
      // Mock weather data
      setWeather({ temp: 22, condition: 'Sunny' });
    } catch (error) {
      console.error('Error fetching weather:', error);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = users.find(u => u.username === loginForm.username);
    if (user) {
      setCurrentUser(user);
      setIsLoggedIn(true);
      setLoginForm({ username: '', password: '' });
    } else {
      alert('Invalid credentials');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: User = {
      id: users.length + 1,
      ...registerForm,
      skills: [],
      points: registerForm.role === 'alumni' ? 0 : undefined,
      achievements: registerForm.role === 'alumni' ? [] : undefined,
      mentoring: registerForm.role === 'alumni' ? false : undefined
    };
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    setIsLoggedIn(true);
    setRegisterForm({
      name: '', username: '', email: '', password: '', role: 'alumni',
      college: '', batch: '', domain: ''
    });
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: User = {
      id: users.length + 1,
      ...newUserForm,
      skills: newUserForm.skills.split(',').map(s => s.trim()).filter(s => s),
      points: newUserForm.role === 'alumni' ? 0 : undefined,
      achievements: newUserForm.role === 'alumni' ? [] : undefined,
      mentoring: newUserForm.role === 'alumni' ? false : undefined
    };
    setUsers([...users, newUser]);
    setShowModal(false);
    setNewUserForm({
      name: '', username: '', email: '', password: '', role: 'alumni',
      college: '', batch: '', domain: '', company: '', location: '', skills: '', experience: '',
      phone: '', linkedin: '', website: ''
    });
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    const newEvent: Event = {
      id: events.length + 1,
      ...newEventForm,
      organizer: currentUser?.name || 'Admin',
      attendees: 0
    };
    setEvents([...events, newEvent]);
    setShowEventModal(false);
    setNewEventForm({
      title: '', date: '', time: '', location: '', description: '', maxAttendees: 50, points: 25
    });
  };

  const handleAddJob = (e: React.FormEvent) => {
    e.preventDefault();
    const newJob: Job = {
      id: jobs.length + 1,
      ...newJobForm,
      requirements: newJobForm.requirements.split(',').map(r => r.trim()).filter(r => r),
      postedBy: currentUser?.name || 'Admin',
      postedDate: new Date().toISOString().split('T')[0]
    };
    setJobs([...jobs, newJob]);
    setShowJobModal(false);
    setNewJobForm({
      title: '', company: '', location: '', salary: '', domain: '', description: '', requirements: ''
    });
  };

  const handleEditUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      setUsers(users.map(user => 
        user.id === editingUser.id ? editingUser : user
      ));
      setShowEditModal(false);
      setEditingUser(null);
    }
  };

  const handleRSVP = (eventId: number) => {
    setEvents(events.map(event => 
      event.id === eventId 
        ? { ...event, attendees: event.attendees + 1 }
        : event
    ));
    
    if (currentUser?.role === 'alumni') {
      const event = events.find(e => e.id === eventId);
      if (event) {
        setUsers(users.map(user => 
          user.id === currentUser.id 
            ? { ...user, points: (user.points || 0) + event.points }
            : user
        ));
        setCurrentUser({ ...currentUser, points: (currentUser.points || 0) + event.points });
      }
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    setCurrentView('dashboard');
  };

  const openProfile = (user: User) => {
    setSelectedUser(user);
    setShowProfileModal(true);
  };

  const openContact = (user: User) => {
    setSelectedUser(user);
    setShowContactModal(true);
  };

  const openEdit = (user: User) => {
    setEditingUser({ ...user });
    setShowEditModal(true);
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = !searchTerm || 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.college?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.domain?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.skills?.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesDomain = !filterDomain || (user.domain && user.domain.toLowerCase().includes(filterDomain.toLowerCase()));
    const matchesLocation = !filterLocation || (user.location && user.location.toLowerCase().includes(filterLocation.toLowerCase()));
    const matchesCollege = !filterCollege || (user.college && user.college.toLowerCase().includes(filterCollege.toLowerCase()));
    
    return matchesSearch && matchesDomain && matchesLocation && matchesCollege;
  });

  const getFilteredUsersByRole = (role: User['role']) => {
    return filteredUsers.filter(user => user.role === role);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-md border border-white/20">
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-blue-400 to-purple-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Alumni Portal</h1>
            <p className="text-blue-200">Connect, Network, Grow</p>
          </div>

          <div className="flex mb-6 bg-white/10 rounded-lg p-1">
            <button
              onClick={() => setShowLogin(true)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                showLogin 
                  ? 'bg-white text-blue-900 shadow-lg' 
                  : 'text-white hover:bg-white/10'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setShowLogin(false)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                !showLogin 
                  ? 'bg-white text-blue-900 shadow-lg' 
                  : 'text-white hover:bg-white/10'
              }`}
            >
              Register
            </button>
          </div>

          {showLogin ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-blue-200 mb-2">Username</label>
                <input
                  type="text"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  placeholder="Enter username"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-200 mb-2">Password</label>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  placeholder="Enter password"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-105 shadow-lg"
              >
                Sign In
              </button>
              <div className="text-center text-sm text-blue-200 mt-4">
                Demo: admin/admin, alice/alice, bob/bob, carol/carol
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-2">Name</label>
                  <input
                    type="text"
                    value={registerForm.name}
                    onChange={(e) => setRegisterForm({...registerForm, name: e.target.value})}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    placeholder="Full name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-2">Username</label>
                  <input
                    type="text"
                    value={registerForm.username}
                    onChange={(e) => setRegisterForm({...registerForm, username: e.target.value})}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    placeholder="Username"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-200 mb-2">Email</label>
                <input
                  type="email"
                  value={registerForm.email}
                  onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  placeholder="Email address"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-200 mb-2">Password</label>
                <input
                  type="password"
                  value={registerForm.password}
                  onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  placeholder="Password"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-2">Role</label>
                  <select
                    value={registerForm.role}
                    onChange={(e) => setRegisterForm({...registerForm, role: e.target.value as User['role']})}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  >
                    <option value="alumni" className="text-gray-900">Alumni</option>
                    <option value="student" className="text-gray-900">Student</option>
                    <option value="recruiter" className="text-gray-900">Recruiter</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-2">College</label>
                  <input
                    type="text"
                    value={registerForm.college}
                    onChange={(e) => setRegisterForm({...registerForm, college: e.target.value})}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    placeholder="College"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-2">Batch</label>
                  <input
                    type="text"
                    value={registerForm.batch}
                    onChange={(e) => setRegisterForm({...registerForm, batch: e.target.value})}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    placeholder="Batch year"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-2">Domain</label>
                  <input
                    type="text"
                    value={registerForm.domain}
                    onChange={(e) => setRegisterForm({...registerForm, domain: e.target.value})}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    placeholder="Field of study"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-4 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg"
              >
                Create Account
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Alumni Portal</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                {weather.temp}°C, {weather.condition}
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {currentUser?.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">{currentUser?.name}</div>
                  <div className="text-xs text-gray-500 capitalize">{currentUser?.role}</div>
                </div>
              </div>
              <button
                onClick={() => openProfile(currentUser!)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <User className="w-5 h-5" />
              </button>
              <button
                onClick={handleLogout}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Admin Dashboard */}
        {currentUser?.role === 'admin' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-gray-900">Admin Dashboard</h2>
              <div className="flex space-x-3">
                <button
                  onClick={() => setCurrentView('dashboard')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentView === 'dashboard' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setCurrentView('users')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentView === 'users' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Manage Users
                </button>
                <button
                  onClick={() => setCurrentView('events')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentView === 'events' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Manage Events
                </button>
                <button
                  onClick={() => setCurrentView('jobs')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentView === 'jobs' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Manage Jobs
                </button>
              </div>
            </div>

            {currentView === 'dashboard' && (
              <>
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100">Total Alumni</p>
                        <p className="text-3xl font-bold">{users.filter(u => u.role === 'alumni').length}</p>
                      </div>
                      <Users className="w-8 h-8 text-blue-200" />
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-100">Active Students</p>
                        <p className="text-3xl font-bold">{users.filter(u => u.role === 'student').length}</p>
                      </div>
                      <GraduationCap className="w-8 h-8 text-green-200" />
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-100">Upcoming Events</p>
                        <p className="text-3xl font-bold">{events.length}</p>
                      </div>
                      <Calendar className="w-8 h-8 text-purple-200" />
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-orange-100">Job Postings</p>
                        <p className="text-3xl font-bold">{jobs.length}</p>
                      </div>
                      <Briefcase className="w-8 h-8 text-orange-200" />
                    </div>
                  </div>
                </div>

                {/* Charts and Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">User Distribution</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Alumni</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full" 
                              style={{width: `${(users.filter(u => u.role === 'alumni').length / users.length) * 100}%`}}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{users.filter(u => u.role === 'alumni').length}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Students</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full" 
                              style={{width: `${(users.filter(u => u.role === 'student').length / users.length) * 100}%`}}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{users.filter(u => u.role === 'student').length}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Recruiters</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-purple-500 h-2 rounded-full" 
                              style={{width: `${(users.filter(u => u.role === 'recruiter').length / users.length) * 100}%`}}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{users.filter(u => u.role === 'recruiter').length}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Alumni Leaderboard</h3>
                    <div className="space-y-3">
                      {users
                        .filter(u => u.role === 'alumni' && u.points)
                        .sort((a, b) => (b.points || 0) - (a.points || 0))
                        .slice(0, 5)
                        .map((user, index) => (
                          <div key={user.id} className="flex items-center space-x-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                              index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-orange-500' : 'bg-blue-500'
                            }`}>
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">{user.name}</p>
                              <p className="text-sm text-gray-500">{user.company}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-blue-600">{user.points} pts</p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <Users className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">New alumni registered</p>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <Calendar className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Networking event created</p>
                        <p className="text-xs text-gray-500">5 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                        <Briefcase className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">New job posting added</p>
                        <p className="text-xs text-gray-500">1 day ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {currentView === 'users' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-gray-900">User Management</h3>
                  <button
                    onClick={() => setShowModal(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add User</span>
                  </button>
                </div>

                {/* Search and Filters */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="relative">
                      <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Filter by domain..."
                      value={filterDomain}
                      onChange={(e) => setFilterDomain(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Filter by location..."
                      value={filterLocation}
                      onChange={(e) => setFilterLocation(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Filter by college..."
                      value={filterCollege}
                      onChange={(e) => setFilterCollege(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Users Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredUsers.map(user => (
                    <div key={user.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold">{user.name.charAt(0)}</span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{user.name}</h3>
                            <p className="text-sm text-gray-500 capitalize">{user.role}</p>
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.role === 'admin' ? 'bg-red-100 text-red-800' :
                          user.role === 'alumni' ? 'bg-blue-100 text-blue-800' :
                          user.role === 'student' ? 'bg-green-100 text-green-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {user.role}
                        </span>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <p className="text-sm text-gray-600">{user.email}</p>
                        {user.college && <p className="text-sm text-gray-600">{user.college} • {user.batch}</p>}
                        {user.domain && <p className="text-sm text-gray-600">{user.domain}</p>}
                        {user.company && <p className="text-sm text-gray-600">{user.company}</p>}
                        {user.location && <p className="text-sm text-gray-600 flex items-center"><MapPin className="w-3 h-3 mr-1" />{user.location}</p>}
                        {user.points !== undefined && (
                          <p className="text-sm font-medium text-blue-600">{user.points} points</p>
                        )}
                      </div>

                      <div className="flex space-x-2">
                        <button
                          onClick={() => openProfile(user)}
                          className="flex-1 bg-blue-50 text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center space-x-1"
                        >
                          <Eye className="w-4 h-4" />
                          <span>View</span>
                        </button>
                        <button
                          onClick={() => openEdit(user)}
                          className="flex-1 bg-gray-50 text-gray-600 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center space-x-1"
                        >
                          <Edit className="w-4 h-4" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => openContact(user)}
                          className="bg-green-50 text-green-600 px-3 py-2 rounded-lg hover:bg-green-100 transition-colors"
                        >
                          <Phone className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentView === 'events' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-gray-900">Event Management</h3>
                  <button
                    onClick={() => setShowEventModal(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Event</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {events.map(event => (
                    <div key={event.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center">
                            <Calendar className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{event.title}</h3>
                            <p className="text-sm text-gray-500">{event.organizer}</p>
                          </div>
                        </div>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                          {event.points} pts
                        </span>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <p className="text-sm text-gray-600 flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          {event.date} at {event.time}
                        </p>
                        <p className="text-sm text-gray-600 flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          {event.location}
                        </p>
                        <p className="text-sm text-gray-600">{event.description}</p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">
                            {event.attendees}/{event.maxAttendees} attendees
                          </span>
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full" 
                              style={{width: `${(event.attendees / event.maxAttendees) * 100}%`}}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentView === 'jobs' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-gray-900">Job Management</h3>
                  <button
                    onClick={() => setShowJobModal(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Job</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {jobs.map(job => (
                    <div key={job.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-gray-900">{job.title}</h3>
                          <p className="text-lg font-medium text-blue-600">{job.company}</p>
                        </div>
                        <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">
                          {job.domain}
                        </span>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <p className="text-sm text-gray-600 flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          {job.location}
                        </p>
                        <p className="text-sm font-medium text-green-600">{job.salary}</p>
                        <p className="text-sm text-gray-600">{job.description}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {job.requirements.map((req, index) => (
                            <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                              {req}
                            </span>
                          ))}
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          Posted by {job.postedBy} on {job.postedDate}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Alumni Dashboard */}
        {currentUser?.role === 'alumni' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-gray-900">Alumni Dashboard</h2>
              <div className="flex space-x-3">
                <button
                  onClick={() => setCurrentView('dashboard')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentView === 'dashboard' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setCurrentView('students')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentView === 'students' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  View Students
                </button>
                <button
                  onClick={() => setCurrentView('events')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentView === 'events' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Events
                </button>
              </div>
            </div>

            {currentView === 'dashboard' && (
              <>
                {/* Alumni Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100">Your Points</p>
                        <p className="text-3xl font-bold">{currentUser.points || 0}</p>
                      </div>
                      <Star className="w-8 h-8 text-blue-200" />
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-100">Your Rank</p>
                        <p className="text-3xl font-bold">
                          #{users
                            .filter(u => u.role === 'alumni' && u.points)
                            .sort((a, b) => (b.points || 0) - (a.points || 0))
                            .findIndex(u => u.id === currentUser.id) + 1}
                        </p>
                      </div>
                      <Trophy className="w-8 h-8 text-green-200" />
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-100">Achievements</p>
                        <p className="text-3xl font-bold">{currentUser.achievements?.length || 0}</p>
                      </div>
                      <Award className="w-8 h-8 text-purple-200" />
                    </div>
                  </div>
                </div>

                {/* Achievements */}
                {currentUser.achievements && currentUser.achievements.length > 0 && (
                  <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Achievements</h3>
                    <div className="flex flex-wrap gap-3">
                      {currentUser.achievements.map((achievement, index) => (
                        <div key={index} className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-4 py-2 rounded-full flex items-center space-x-2">
                          <Award className="w-4 h-4" />
                          <span className="font-medium">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* News Feed */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Latest News</h3>
                  <div className="space-y-4">
                    {news.map(item => (
                      <div key={item.id} className="border-l-4 border-blue-500 pl-4">
                        <h4 className="font-medium text-gray-900">{item.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{item.content}</p>
                        <p className="text-xs text-gray-500 mt-2">By {item.author} • {item.date}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {currentView === 'students' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-gray-900">Student Directory</h3>
                </div>

                {/* Search and Filters */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="relative">
                      <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search students..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Filter by domain..."
                      value={filterDomain}
                      onChange={(e) => setFilterDomain(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Filter by location..."
                      value={filterLocation}
                      onChange={(e) => setFilterLocation(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Filter by college..."
                      value={filterCollege}
                      onChange={(e) => setFilterCollege(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Students Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {getFilteredUsersByRole('student').map(student => (
                    <div key={student.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold">{student.name.charAt(0)}</span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{student.name}</h3>
                            <p className="text-sm text-gray-500">Student</p>
                          </div>
                        </div>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                          Student
                        </span>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <p className="text-sm text-gray-600">{student.email}</p>
                        {student.college && <p className="text-sm text-gray-600">{student.college} • {student.batch}</p>}
                        {student.domain && <p className="text-sm text-gray-600">{student.domain}</p>}
                        {student.skills && student.skills.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {student.skills.slice(0, 3).map((skill, index) => (
                              <span key={index} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                                {skill}
                              </span>
                            ))}
                            {student.skills.length > 3 && (
                              <span className="text-xs text-gray-500">+{student.skills.length - 3} more</span>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="flex space-x-2">
                        <button
                          onClick={() => openProfile(student)}
                          className="flex-1 bg-blue-50 text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center space-x-1"
                        >
                          <Eye className="w-4 h-4" />
                          <span>View Profile</span>
                        </button>
                        <button
                          onClick={() => openContact(student)}
                          className="bg-green-50 text-green-600 px-3 py-2 rounded-lg hover:bg-green-100 transition-colors"
                        >
                          <Phone className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentView === 'events' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900">Upcoming Events</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {events.map(event => (
                    <div key={event.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center">
                            <Calendar className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{event.title}</h3>
                            <p className="text-sm text-gray-500">{event.organizer}</p>
                          </div>
                        </div>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                          {event.points} pts
                        </span>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <p className="text-sm text-gray-600 flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          {event.date} at {event.time}
                        </p>
                        <p className="text-sm text-gray-600 flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          {event.location}
                        </p>
                        <p className="text-sm text-gray-600">{event.description}</p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">
                            {event.attendees}/{event.maxAttendees} attendees
                          </span>
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full" 
                              style={{width: `${(event.attendees / event.maxAttendees) * 100}%`}}
                            ></div>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => handleRSVP(event.id)}
                        className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                        disabled={event.attendees >= event.maxAttendees}
                      >
                        {event.attendees >= event.maxAttendees ? 'Event Full' : 'RSVP'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Student Dashboard */}
        {currentUser?.role === 'student' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-gray-900">Student Dashboard</h2>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Find Alumni</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search alumni..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Filter by domain..."
                  value={filterDomain}
                  onChange={(e) => setFilterDomain(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Filter by location..."
                  value={filterLocation}
                  onChange={(e) => setFilterLocation(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Filter by college..."
                  value={filterCollege}
                  onChange={(e) => setFilterCollege(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Alumni Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getFilteredUsersByRole('alumni').map(alumni => (
                <div key={alumni.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">{alumni.name.charAt(0)}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{alumni.name}</h3>
                        <p className="text-sm text-gray-500">{alumni.company}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                        Alumni
                      </span>
                      {alumni.mentoring && (
                        <div className="mt-1">
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                            Mentor
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-gray-600">{alumni.email}</p>
                    {alumni.college && <p className="text-sm text-gray-600">{alumni.college} • {alumni.batch}</p>}
                    {alumni.domain && <p className="text-sm text-gray-600">{alumni.domain}</p>}
                    {alumni.location && <p className="text-sm text-gray-600 flex items-center"><MapPin className="w-3 h-3 mr-1" />{alumni.location}</p>}
                    {alumni.skills && alumni.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {alumni.skills.slice(0, 3).map((skill, index) => (
                          <span key={index} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                            {skill}
                          </span>
                        ))}
                        {alumni.skills.length > 3 && (
                          <span className="text-xs text-gray-500">+{alumni.skills.length - 3} more</span>
                        )}
                      </div>
                    )}
                    {alumni.points !== undefined && (
                      <p className="text-sm font-medium text-blue-600">{alumni.points} points</p>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => openProfile(alumni)}
                      className="flex-1 bg-blue-50 text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center space-x-1"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View</span>
                    </button>
                    <button
                      onClick={() => openContact(alumni)}
                      className="bg-green-50 text-green-600 px-3 py-2 rounded-lg hover:bg-green-100 transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recruiter Dashboard */}
        {currentUser?.role === 'recruiter' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-gray-900">Recruiter Dashboard</h2>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Find Talent</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search candidates..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Filter by domain..."
                  value={filterDomain}
                  onChange={(e) => setFilterDomain(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Filter by location..."
                  value={filterLocation}
                  onChange={(e) => setFilterLocation(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Filter by college..."
                  value={filterCollege}
                  onChange={(e) => setFilterCollege(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Candidates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUsers.filter(user => user.role === 'alumni' || user.role === 'student').map(candidate => (
                <div key={candidate.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">{candidate.name.charAt(0)}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{candidate.name}</h3>
                        <p className="text-sm text-gray-500">{candidate.company || 'Available'}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      candidate.role === 'alumni' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {candidate.role}
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-gray-600">{candidate.email}</p>
                    {candidate.college && <p className="text-sm text-gray-600">{candidate.college} • {candidate.batch}</p>}
                    {candidate.domain && <p className="text-sm text-gray-600">{candidate.domain}</p>}
                    {candidate.location && <p className="text-sm text-gray-600 flex items-center"><MapPin className="w-3 h-3 mr-1" />{candidate.location}</p>}
                    {candidate.skills && candidate.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {candidate.skills.slice(0, 3).map((skill, index) => (
                          <span key={index} className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs">
                            {skill}
                          </span>
                        ))}
                        {candidate.skills.length > 3 && (
                          <span className="text-xs text-gray-500">+{candidate.skills.length - 3} more</span>
                        )}
                      </div>
                    )}
                    {candidate.experience && (
                      <p className="text-sm text-gray-600">{candidate.experience}</p>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => openProfile(candidate)}
                      className="flex-1 bg-purple-50 text-purple-600 px-3 py-2 rounded-lg hover:bg-purple-100 transition-colors flex items-center justify-center space-x-1"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View</span>
                    </button>
                    <button
                      onClick={() => openContact(candidate)}
                      className="bg-green-50 text-green-600 px-3 py-2 rounded-lg hover:bg-green-100 transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {/* Add User Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Add New User</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <form onSubmit={handleAddUser} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      value={newUserForm.name}
                      onChange={(e) => setNewUserForm({...newUserForm, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                    <input
                      type="text"
                      value={newUserForm.username}
                      onChange={(e) => setNewUserForm({...newUserForm, username: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={newUserForm.email}
                      onChange={(e) => setNewUserForm({...newUserForm, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                    <input
                      type="password"
                      value={newUserForm.password}
                      onChange={(e) => setNewUserForm({...newUserForm, password: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                    <select
                      value={newUserForm.role}
                      onChange={(e) => setNewUserForm({...newUserForm, role: e.target.value as User['role']})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="alumni">Alumni</option>
                      <option value="student">Student</option>
                      <option value="recruiter">Recruiter</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">College</label>
                    <input
                      type="text"
                      value={newUserForm.college}
                      onChange={(e) => setNewUserForm({...newUserForm, college: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Batch</label>
                    <input
                      type="text"
                      value={newUserForm.batch}
                      onChange={(e) => setNewUserForm({...newUserForm, batch: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Domain</label>
                    <input
                      type="text"
                      value={newUserForm.domain}
                      onChange={(e) => setNewUserForm({...newUserForm, domain: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                    <input
                      type="text"
                      value={newUserForm.company}
                      onChange={(e) => setNewUserForm({...newUserForm, company: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <input
                      type="text"
                      value={newUserForm.location}
                      onChange={(e) => setNewUserForm({...newUserForm, location: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Skills (comma-separated)</label>
                  <input
                    type="text"
                    value={newUserForm.skills}
                    onChange={(e) => setNewUserForm({...newUserForm, skills: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="React, Node.js, Python"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="text"
                      value={newUserForm.phone}
                      onChange={(e) => setNewUserForm({...newUserForm, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
                    <input
                      type="text"
                      value={newUserForm.linkedin}
                      onChange={(e) => setNewUserForm({...newUserForm, linkedin: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                  <input
                    type="text"
                    value={newUserForm.website}
                    onChange={(e) => setNewUserForm({...newUserForm, website: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
                  <textarea
                    value={newUserForm.experience}
                    onChange={(e) => setNewUserForm({...newUserForm, experience: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Add User
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditModal && editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Edit User</h3>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <form onSubmit={handleEditUser} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      value={editingUser.name}
                      onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                    <input
                      type="text"
                      value={editingUser.username}
                      onChange={(e) => setEditingUser({...editingUser, username: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={editingUser.email}
                    onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">College</label>
                    <input
                      type="text"
                      value={editingUser.college || ''}
                      onChange={(e) => setEditingUser({...editingUser, college: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Batch</label>
                    <input
                      type="text"
                      value={editingUser.batch || ''}
                      onChange={(e) => setEditingUser({...editingUser, batch: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Domain</label>
                    <input
                      type="text"
                      value={editingUser.domain || ''}
                      onChange={(e) => setEditingUser({...editingUser, domain: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                    <input
                      type="text"
                      value={editingUser.company || ''}
                      onChange={(e) => setEditingUser({...editingUser, company: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    value={editingUser.location || ''}
                    onChange={(e) => setEditingUser({...editingUser, location: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Skills (comma-separated)</label>
                  <input
                    type="text"
                    value={editingUser.skills?.join(', ') || ''}
                    onChange={(e) => setEditingUser({...editingUser, skills: e.target.value.split(',').map(s => s.trim()).filter(s => s)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="React, Node.js, Python"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="text"
                      value={editingUser.phone || ''}
                      onChange={(e) => setEditingUser({...editingUser, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
                    <input
                      type="text"
                      value={editingUser.linkedin || ''}
                      onChange={(e) => setEditingUser({...editingUser, linkedin: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                  <input
                    type="text"
                    value={editingUser.website || ''}
                    onChange={(e) => setEditingUser({...editingUser, website: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
                  <textarea
                    value={editingUser.experience || ''}
                    onChange={(e) => setEditingUser({...editingUser, experience: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                  />
                </div>

                {editingUser.role === 'alumni' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Points</label>
                      <input
                        type="number"
                        value={editingUser.points || 0}
                        onChange={(e) => setEditingUser({...editingUser, points: parseInt(e.target.value) || 0})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="flex items-center">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={editingUser.mentoring || false}
                          onChange={(e) => setEditingUser({...editingUser, mentoring: e.target.checked})}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium text-gray-700">Available for mentoring</span>
                      </label>
                    </div>
                  </div>
                )}

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Add Event Modal */}
      {showEventModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Add New Event</h3>
                <button
                  onClick={() => setShowEventModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <form onSubmit={handleAddEvent} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Event Title</label>
                  <input
                    type="text"
                    value={newEventForm.title}
                    onChange={(e) => setNewEventForm({...newEventForm, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                    <input
                      type="date"
                      value={newEventForm.date}
                      onChange={(e) => setNewEventForm({...newEventForm, date: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                    <input
                      type="time"
                      value={newEventForm.time}
                      onChange={(e) => setNewEventForm({...newEventForm, time: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    value={newEventForm.location}
                    onChange={(e) => setNewEventForm({...newEventForm, location: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={newEventForm.description}
                    onChange={(e) => setNewEventForm({...newEventForm, description: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Max Attendees</label>
                    <input
                      type="number"
                      value={newEventForm.maxAttendees}
                      onChange={(e) => setNewEventForm({...newEventForm, maxAttendees: parseInt(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min="1"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Points Reward</label>
                    <input
                      type="number"
                      value={newEventForm.points}
                      onChange={(e) => setNewEventForm({...newEventForm, points: parseInt(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min="0"
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowEventModal(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Add Event
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Add Job Modal */}
      {showJobModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Add New Job</h3>
                <button
                  onClick={() => setShowJobModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <form onSubmit={handleAddJob} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                  <input
                    type="text"
                    value={newJobForm.title}
                    onChange={(e) => setNewJobForm({...newJobForm, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                    <input
                      type="text"
                      value={newJobForm.company}
                      onChange={(e) => setNewJobForm({...newJobForm, company: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <input
                      type="text"
                      value={newJobForm.location}
                      onChange={(e) => setNewJobForm({...newJobForm, location: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Salary</label>
                    <input
                      type="text"
                      value={newJobForm.salary}
                      onChange={(e) => setNewJobForm({...newJobForm, salary: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="$80,000 - $120,000"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Domain</label>
                    <input
                      type="text"
                      value={newJobForm.domain}
                      onChange={(e) => setNewJobForm({...newJobForm, domain: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={newJobForm.description}
                    onChange={(e) => setNewJobForm({...newJobForm, description: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Requirements (comma-separated)</label>
                  <input
                    type="text"
                    value={newJobForm.requirements}
                    onChange={(e) => setNewJobForm({...newJobForm, requirements: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="React, Node.js, 3+ years experience"
                    required
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowJobModal(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Add Job
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {showProfileModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Profile Details</h3>
                <button
                  onClick={() => setShowProfileModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">{selectedUser.name.charAt(0)}</span>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900">{selectedUser.name}</h2>
                    <p className="text-lg text-gray-600">{selectedUser.company || 'Student'}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        selectedUser.role === 'admin' ? 'bg-red-100 text-red-800' :
                        selectedUser.role === 'alumni' ? 'bg-blue-100 text-blue-800' :
                        selectedUser.role === 'student' ? 'bg-green-100 text-green-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {selectedUser.role.charAt(0).toUpperCase() + selectedUser.role.slice(1)}
                      </span>
                      {selectedUser.role === 'alumni' && selectedUser.mentoring && (
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                          Mentor Available
                        </span>
                      )}
                    </div>
                  </div>
                  {selectedUser.role === 'alumni' && selectedUser.points !== undefined && (
                    <div className="text-right">
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-4 py-2 rounded-lg">
                        <div className="text-2xl font-bold">{selectedUser.points}</div>
                        <div className="text-sm">Points</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Basic Information */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Basic Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{selectedUser.email}</p>
                    </div>
                    {selectedUser.college && (
                      <div>
                        <p className="text-sm text-gray-500">College</p>
                        <p className="font-medium">{selectedUser.college}</p>
                      </div>
                    )}
                    {selectedUser.batch && (
                      <div>
                        <p className="text-sm text-gray-500">Batch</p>
                        <p className="font-medium">{selectedUser.batch}</p>
                      </div>
                    )}
                    {selectedUser.domain && (
                      <div>
                        <p className="text-sm text-gray-500">Domain</p>
                        <p className="font-medium">{selectedUser.domain}</p>
                      </div>
                    )}
                    {selectedUser.location && (
                      <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="font-medium flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {selectedUser.location}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Skills */}
                {selectedUser.skills && selectedUser.skills.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedUser.skills.map((skill, index) => (
                        <span key={index} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Experience */}
                {selectedUser.experience && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Experience</h4>
                    <p className="text-gray-700 bg-gray-50 rounded-lg p-4">{selectedUser.experience}</p>
                  </div>
                )}

                {/* Achievements */}
                {selectedUser.role === 'alumni' && selectedUser.achievements && selectedUser.achievements.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Achievements</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedUser.achievements.map((achievement, index) => (
                        <div key={index} className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-2 rounded-full flex items-center space-x-2">
                          <Award className="w-4 h-4" />
                          <span className="font-medium">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contact Information */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Contact Information</h4>
                  <div className="space-y-2">
                    {selectedUser.phone && (
                      <p className="flex items-center text-gray-700">
                        <Phone className="w-4 h-4 mr-2" />
                        {selectedUser.phone}
                      </p>
                    )}
                    <p className="flex items-center text-gray-700">
                      <Mail className="w-4 h-4 mr-2" />
                      {selectedUser.email}
                    </p>
                    {selectedUser.linkedin && (
                      <p className="flex items-center text-gray-700">
                        <Linkedin className="w-4 h-4 mr-2" />
                        {selectedUser.linkedin}
                      </p>
                    )}
                    {selectedUser.website && (
                      <p className="flex items-center text-gray-700">
                        <Globe className="w-4 h-4 mr-2" />
                        {selectedUser.website}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    onClick={() => {
                      setShowProfileModal(false);
                      openContact(selectedUser);
                    }}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Contact</span>
                  </button>
                  <button
                    onClick={() => setShowProfileModal(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Modal */}
      {showContactModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Contact {selectedUser.name}</h3>
                <button
                  onClick={() => setShowContactModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-xl font-bold">{selectedUser.name.charAt(0)}</span>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">{selectedUser.name}</h4>
                  <p className="text-gray-600">{selectedUser.company || selectedUser.college}</p>
                </div>

                <div className="space-y-3">
                  {selectedUser.phone && (
                    <a
                      href={`tel:${selectedUser.phone}`}
                      className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                    >
                      <Phone className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium text-gray-900">Call</p>
                        <p className="text-sm text-gray-600">{selectedUser.phone}</p>
                      </div>
                    </a>
                  )}
                  
                  <a
                    href={`mailto:${selectedUser.email}`}
                    className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <Mail className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">Email</p>
                      <p className="text-sm text-gray-600">{selectedUser.email}</p>
                    </div>
                  </a>

                  {selectedUser.linkedin && (
                    <a
                      href={`https://${selectedUser.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <Linkedin className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-gray-900">LinkedIn</p>
                        <p className="text-sm text-gray-600">{selectedUser.linkedin}</p>
                      </div>
                    </a>
                  )}

                  {selectedUser.website && (
                    <a
                      href={`https://${selectedUser.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                    >
                      <Globe className="w-5 h-5 text-purple-600" />
                      <div>
                        <p className="font-medium text-gray-900">Website</p>
                        <p className="text-sm text-gray-600">{selectedUser.website}</p>
                      </div>
                    </a>
                  )}
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Professional Networking:</strong> Please maintain professional communication and respect privacy when reaching out to alumni and students.
                  </p>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    onClick={() => setShowContactModal(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;