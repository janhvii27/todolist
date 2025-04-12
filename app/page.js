
'use client';
import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

const NoteApp = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');

  const handleAddNote = () => {
    const newNote = {
      id: Date.now(),
      title: newNoteTitle || 'New Additions',
      content: newNoteContent || 'To stay representative of framework & new example apps.',
      createdAt: new Date(),
    };
    setNotes([newNote, ...notes]);
    setSelectedNoteId(newNote.id);
    setNewNoteTitle('');
    setNewNoteContent('');
  };

  const handleUpdateNoteContent = (id, newContent) => {
    setNotes(notes.map(note =>
      note.id === id ? { ...note, content: newContent } : note
    ));
  };

  const handleUpdateNoteTitle = (id, newTitle) => {
    setNotes(notes.map(note =>
      note.id === id ? { ...note, title: newTitle } : note
    ));
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
    setSelectedNoteId(null);
  };

  const selectedNote = notes.find(note => note.id === selectedNoteId);

  return (
    <div className="h-screen w-full font-sans bg-gray-100 text-black">
      <div className="flex h-full border mx-auto max-w-screen-xl shadow">
        {/* Sidebar */}
        <div className="w-1/3 bg-white border-r p-4 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="bg-green-500 h-6 w-6 rounded-sm"></div>
              <h1 className="text-xl font-bold">TODO</h1>
            </div>
            <button
              className="p-1 hover:bg-gray-200 rounded"
              onClick={handleAddNote}
            >
              <Plus />
            </button>
          </div>

          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border rounded-full pl-10 text-sm"
            />
            <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
          </div>

          <div className="overflow-y-auto space-y-2 flex-1">
            {notes
              .filter(note =>
                note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                note.content.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map(note => (
                <div
                  key={note.id}
                  onClick={() => setSelectedNoteId(note.id)}
                  className={`cursor-pointer border p-3 rounded-md ${
                    selectedNoteId === note.id
                      ? 'border-black bg-gray-100'
                      : 'border-transparent hover:bg-gray-50'
                  }`}
                >
                  <h3 className="font-semibold text-sm">{note.title}</h3>
                  <p className="text-xs text-gray-600">
                    {note.content.slice(0, 50)}...
                  </p>
                  <p className="text-[11px] text-gray-400 mt-1">
                    {note.createdAt.toLocaleDateString()}
                  </p>
                </div>
              ))}
          </div>
        </div>

        {/* Editor */}
        <div className="w-2/3 p-6 bg-white">
          {selectedNote ? (
            <div>
              <div className="flex justify-between items-center mb-4">
                <input
                  type="text"
                  value={selectedNote.title}
                  onChange={(e) => handleUpdateNoteTitle(selectedNote.id, e.target.value)}
                  className="text-2xl font-bold border-b-2 w-full"
                />
                <button
                  onClick={() => handleDeleteNote(selectedNoteId)}
                  className="text-gray-600 hover:text-red-600"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              {/* Editor content */}
              <textarea
                value={selectedNote.content}
                onChange={(e) => handleUpdateNoteContent(selectedNote.id, e.target.value)}
                className="w-full h-64 p-4 border rounded-lg text-sm"
                placeholder="Write your notes here..."
              />
            </div>
          ) : (
            <p className="text-gray-500 text-lg">
              Select a note to view or edit
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoteApp;



// 'use client';
// import React, { useState } from 'react';
// import { Plus, Trash2 } from 'lucide-react';

// const NoteApp = () => {
//   const [notes, setNotes] = useState([]);
//   const [selectedNoteId, setSelectedNoteId] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');

//   const handleAddNote = () => {
//     const newNote = {
//       id: Date.now(),
//       title: 'New Additions',
//       content: 'To stay representative of framework & new example apps.',
//       createdAt: new Date('2023-07-07'),
//     };
//     setNotes([newNote, ...notes]);
//     setSelectedNoteId(newNote.id);
//   };

//   const handleUpdateNoteContent = (id, newContent) => {
//     setNotes(notes.map(note =>
//       note.id === id ? { ...note, content: newContent } : note
//     ));
//   };

//   const handleDeleteNote = (id) => {
//     setNotes(notes.filter(note => note.id !== id));
//     setSelectedNoteId(null);
//   };

//   const selectedNote = notes.find(note => note.id === selectedNoteId);

//   return (
//     <div className="h-screen w-full font-sans bg-gray-100 text-black">
//       <div className="flex h-full border mx-auto max-w-screen-xl shadow">
//         {/* Sidebar */}
//         <div className="w-1/3 bg-white border-r p-4 flex flex-col">
//           <div className="flex items-center justify-between mb-4">
//             <div className="flex items-center space-x-2">
//               <div className="bg-green-500 h-6 w-6 rounded-sm"></div>
//               <h1 className="text-xl font-bold">TODO</h1>
//             </div>
//             <button
//               className="p-1 hover:bg-gray-200 rounded"
//               onClick={handleAddNote}
//             >
//               <Plus />
//             </button>
//           </div>

//           <div className="relative mb-4">
//             <input
//               type="text"
//               placeholder="Search..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full px-3 py-2 border rounded-full pl-10 text-sm"
//             />
//             <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
//           </div>

//           <div className="overflow-y-auto space-y-2 flex-1">
//             {notes
//               .filter(note =>
//                 note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 note.content.toLowerCase().includes(searchTerm.toLowerCase())
//               )
//               .map(note => (
//                 <div
//                   key={note.id}
//                   onClick={() => setSelectedNoteId(note.id)}
//                   className={`cursor-pointer border p-3 rounded-md ${
//                     selectedNoteId === note.id
//                       ? 'border-black bg-gray-100'
//                       : 'border-transparent hover:bg-gray-50'
//                   }`}
//                 >
//                   <h3 className="font-semibold text-sm">New Additions</h3>
//                   <p className="text-xs text-gray-600">
//                     To stay representative of framework & new example apps.
//                   </p>
//                   <p className="text-[11px] text-gray-400 mt-1">
//                     July 7, 2023
//                   </p>
//                 </div>
//               ))}
//           </div>
//         </div>

//         {/* Editor */}
//         <div className="w-2/3 p-6 bg-white">
//           {selectedNote ? (
//             <div>
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-2xl font-bold">New Additions</h2>
//                 <button
//                   onClick={() => handleDeleteNote(selectedNoteId)}
//                   className="text-gray-600 hover:text-red-600"
//                 >
//                   <Trash2 size={18} />
//                 </button>
//               </div>

//               {/* Toolbar Icons */}
//               <div className="flex gap-3 mb-4 text-gray-600 border-b pb-2 text-sm">
//                 <button className="font-bold hover:text-black">B</button>
//                 <button className="italic hover:text-black">I</button>
//                 <button className="underline hover:text-black">U</button>
//                 <button className="hover:text-black">☰</button>
//                 <button className="hover:text-black">⋮</button>
//                 <button className="hover:text-black">↷</button>
//                 <button className="hover:text-black">𝚷</button>
//               </div>

//               <p className="text-sm text-gray-800">
//                 {selectedNote.content}
//               </p>
//             </div>
//           ) : (
//             <p className="text-gray-500 text-lg">
//               Select a note to view or edit
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NoteApp;
