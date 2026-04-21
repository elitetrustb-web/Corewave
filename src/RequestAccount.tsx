
import { useState } from 'react';

export default function RequestAccount(){
 const [name,setName]=useState('');
 const [email,setEmail]=useState('');
 const [message,setMessage]=useState('');
 const handleSubmit=(e:any)=>{
  e.preventDefault();
  alert("Request submitted to admin for approval.");
 };
 return (
  <div className="p-6 max-w-md mx-auto">
   <h2 className="text-xl font-semibold mb-4">Submit Account Request</h2>
   <form onSubmit={handleSubmit} className="space-y-3">
    <input className="w-full border p-2 rounded" placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} />
    <input className="w-full border p-2 rounded" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
    <textarea className="w-full border p-2 rounded" placeholder="Request message" value={message} onChange={e=>setMessage(e.target.value)} />
    <button className="w-full bg-black text-white p-2 rounded">Submit Request</button>
   </form>
  </div>
 );
}
