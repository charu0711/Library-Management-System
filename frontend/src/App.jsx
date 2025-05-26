import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import BookManagement from './pages/BookManagement';
import MemberManagement from './pages/MemberManagement';
import AddBook from './pages/AddBook';
import MemberPortal from './pages/MemberPortal';
import Home from './pages/Home';
import MemberDashboard from './pages/MemberDashboard';
import MemberCatalog from './pages/MemberCatalog';
import MemberBorrowed from './pages/MemberBorrowed';
import MemberReserved from './pages/MemberReserved';
import LibrarianBorrowings from './pages/LibrarianBorrowings';
import MemberProfile from './pages/MemberProfile';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/books" element={<BookManagement />} />
      <Route path="/members" element={<MemberManagement />} />
      <Route path="/addbook" element={<AddBook />} />
      <Route path="/borrowings" element={<LibrarianBorrowings />} />
      <Route path="/memberportal" element={<MemberPortal />}>
        <Route index element={<MemberDashboard />} />
        <Route path="catalog" element={<MemberCatalog />} />
        <Route path="borrowed" element={<MemberBorrowed />} />
        <Route path="reserved" element={<MemberReserved />} />
        <Route path="profile" element={<MemberProfile />} />
      </Route>
    </Routes>
  );
}

export default App;
