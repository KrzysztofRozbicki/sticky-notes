import TrashIcon from './assets/icons/trash.svg';
import EditIcon from './assets/icons/edit.svg';

const notesEl = document.getElementById('sticky-notes');
const STICKY_INITIAL_CLASSLIST =
  'rounded-xl border-4 border-blue-500 w-48 sticky-note h-56 px-4 py-2 relative';
const TRASHICON_INITIAL_CLASSLIST = 'absolute top-2 right-2 hover:cursor-pointer';
const EDITICON_INITIAL_CLASSLIST = 'absolute bottom-2 right-2 hover:cursor-pointer';
const TEXTAREA_INITIAL_CLASSLIST = 'w-10/12 h-48 resize-none p-2';

const createNote = (text, id) => {
  const stickyNote = document.createElement('div');
  const textAreaEl = document.createElement('textarea');
  stickyNote.classList.add(...STICKY_INITIAL_CLASSLIST.split(' '));
  stickyNote.setAttribute('id', id);
  stickyNote.appendChild(textAreaEl);
  textAreaEl.value = text;
  textAreaEl.disabled = true;
  textAreaEl.setAttribute('id', `textarea-${id}`);
  textAreaEl.classList.add(...TEXTAREA_INITIAL_CLASSLIST.split(' '));
  stickyNote.append(createTrashIcon(), createEditIcon());
  return stickyNote;
};

const createTrashIcon = () => {
  const trashIcon = new Image(24, 24);
  trashIcon.src = TrashIcon;
  trashIcon.classList.add(...TRASHICON_INITIAL_CLASSLIST.split(' '));
  trashIcon.setAttribute('id', 'trash-icon');
  return trashIcon;
};

const createEditIcon = () => {
  const editIcon = new Image(24, 24);
  editIcon.src = EditIcon;
  editIcon.classList.add(...EDITICON_INITIAL_CLASSLIST.split(' '));
  editIcon.setAttribute('id', 'edit-icon');
  return editIcon;
};

const addNote = note => {
  notesEl.appendChild(note);
};

const removeNote = id => {
  const deletedChild = document.getElementById(id);
  notesEl.removeChild(deletedChild);
};

export { createNote, addNote, removeNote };
