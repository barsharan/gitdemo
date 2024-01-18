let notes = [];

const API_URL = 'https://crudcrud.com/api/e7badc0c53e442d7924d414b65107f6f/note';

// add a new note
async function addNote(title, desc) {
    try {
        const response = await axios.post(API_URL, { title, desc });
        const newNote = response.data;
        notes.push(newNote);
        console.log('Note Added:', newNote);
        displayNotes();
        updateNoteCounts();
    } catch (error) {
        console.error('Failed to add note:', error.message);
    }
}

//search
async function displayNotes(searchTerm = '') {
    try {
        const response = await axios.get(API_URL);
        notes = response.data;

        console.log('Fetched Notes:', notes);

        const noteListSection = document.querySelector('.cont h2 + .brdr');
        noteListSection.innerHTML = ''; // Clear existing notes

        const filteredNotes = notes.filter((note) => {
            return note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                note.desc.toLowerCase().includes(searchTerm.toLowerCase());
        });

        filteredNotes.forEach((note, index) => {
            const noteDiv = document.createElement('div');
            noteDiv.innerHTML = `<strong>${note.title}</strong><p>${note.desc}</p>`;

            // Add delete button
            const deleteBtn = document.createElement('button');
            deleteBtn.innerText = 'Delete';
            deleteBtn.addEventListener('click', () => deleteNote(note._id));

            noteDiv.appendChild(deleteBtn);
            noteListSection.appendChild(noteDiv);
        });

        updateNoteCounts(filteredNotes.length);
    } catch (error) {
        console.error('Failed to fetch notes:', error.message);
    }
}

//update note counts
function updateNoteCounts(filteredNotesCount = 0) {
    const totalNotesCount = document.getElementById('totalNotesCount');
    const showingNotesCount = document.getElementById('showingNotesCount');

    if (totalNotesCount && showingNotesCount) {
        totalNotesCount.innerText = `Total Notes: ${notes.length}`;
        showingNotesCount.innerText = `Notes Showing: ${filteredNotesCount}`;
    }
}

// form submission
const form = document.getElementById('app');
form.addEventListener('submit', function (event) {
    event.preventDefault(); 

    const titleInput = form.querySelector('input[name="title"]');
    const descInput = form.querySelector('textarea[name="desc"]');

    const title = titleInput.value.trim();
    const desc = descInput.value.trim();

    if (title !== '' && desc !== '') {
        console.log('Adding Note:', title, desc);
        addNote(title, desc);
        titleInput.value = '';
        descInput.value = '';
        const searchInput = document.querySelector('input[name="search"]');
        displayNotes(searchInput.value); // Update notes based on search
    }
});

// search input
const searchInput = document.querySelector('input[name="search"]');
searchInput.addEventListener('input', function () {
    const searchTerm = searchInput.value;
    console.log('Search Term:', searchTerm);
    displayNotes(searchTerm); // Update notes based on search
});

// Function to delete a note
async function deleteNote(noteId) {
    try {
        await axios.delete(`${API_URL}/${noteId}`);
        console.log('Note Deleted:', noteId);
        displayNotes(searchInput.value); // Update notes based on search
        updateNoteCounts(); // Update counts after deleting a note
    } catch (error) {
        console.error('Failed to delete note:', error.message);
    }
}

// Initial display of notes and counts
displayNotes();
updateNoteCounts();