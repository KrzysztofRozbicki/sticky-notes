import { StickyNoteState } from './StickyNoteState';
import { createNote, addNote, removeNote } from './notes';
import Notiflix from 'notiflix';

const inputEl = document.getElementById('sticky-input');
const ENTER_KEY = 'Enter';
const NUMPAD_ENTER = 'NumpadEnter';
const WARNING_TEXT_UNSAVED_NOTE = 'You have unsaved Note.';

const stickyNoteState = new StickyNoteState();
stickyNoteState.loadStickyNotes();

const createStickyNote = event => {
  if (event.code === ENTER_KEY || event.code === NUMPAD_ENTER) {
    const textValue = event.currentTarget.value;
    event.currentTarget.value = '';
    addNote(createNote(textValue, stickyNoteState.newIDElement()));
    createDeleteEventListeners();
    createEditEventListeners();
    stickyNoteState.addStickyNote(textValue);
  }
};

const deleteState = event => {
  const id = event.target.parentNode.id;
  stickyNoteState.deleteStickyNote(+id);
  removeNote(id);
  stickyNoteState.loadStickyNotes();
};

const createDeleteEventListeners = () => {
  const trashIcons = document.querySelectorAll('#trash-icon');
  trashIcons.forEach(icon => icon.addEventListener('click', deleteState));
};

const updateState = (event, id) => {
  stickyNoteState.updateStickyNote(id, event.target.value);
};

const editNote = event => {
  const id = +event.target.parentNode.id;
  const textAreaEl = document.getElementById(`textarea-${id}`);
  textAreaEl.disabled = false;
  textAreaEl.focus();
  textAreaEl.addEventListener('input', event => updateState(event, id));
  textAreaEl.addEventListener('blur', () => (textAreaEl.disabled = true));
};

const createEditEventListeners = () => {
  const trashIcons = document.querySelectorAll('#edit-icon');
  trashIcons.forEach(icon => icon.addEventListener('click', editNote));
};

const getNotesFromLocalStorage = () =>
  stickyNoteState.state.forEach(note => addNote(createNote(note.text, note.id)));

const showUnsavedNoteWarning = event => {
  if (event.currentTarget.value) Notiflix.Notify.warning(WARNING_TEXT_UNSAVED_NOTE);
};

getNotesFromLocalStorage();
createDeleteEventListeners();
createEditEventListeners();
inputEl.addEventListener('keydown', createStickyNote);
inputEl.addEventListener('blur', showUnsavedNoteWarning);
