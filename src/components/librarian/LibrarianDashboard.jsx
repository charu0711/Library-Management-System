import axios from "axios";
import { useEffect, useState } from "react";

function LibrarianDashboard(){

    const [books,setBooks] = useState([])
    const [members,setMembers] = useState([])

    const [showBookForm,setShowBookForm] = useState(true);

    useEffect(()=>{
        const fetchBook = async () => {
            try {
               const res = await axios.get("http:localhost:8087/api/book/all")
               setBooks(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        const fetchMember = async () => {
            try {
             const res = await axios.get("http:localhost:8087/api/member/all")
             setMembers(res.data)
            } catch (error) {
                console.log(error) 
            }
        }
        fetchBook()
        fetchMember()
    },[])
    
    return(
        <div>
        <h2>Librarian Panel</h2>
        <div className="mb-4">
          <h5>Books Inventory</h5>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Genre</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map(book => (
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.genre}</td>
                  <td>{book.isbn}</td>
                  <td>{book.publishedDate}</td>
                  <td>{book.available ? 'Available' : 'Borrowed'}</td>
                  <td>
                    <button className="btn btn-sm btn-warning mx-1">Edit</button>
                    <button className="btn btn-sm btn-danger mx-1">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <h5>Members</h5>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map(member => (
                <tr key={member.id}>
                  <td>{member.name}</td>
                  <td>{member.email}</td>
                  <td>{member.phoneNumber}</td>
                  <td>{member.address}</td>
                  <td>{member.joinDate}</td>
                  <td>{}</td>
                  <td>
                    <button className="btn btn-sm btn-warning mx-1">Edit</button>
                    <button className="btn btn-sm btn-danger mx-1">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
    
}
export default LibrarianDashboard;