export class StickyNoteState {
  #state = [];

  addStickyNote = value => {
    this.#state.push({
      id: this.newIDElement(),
      text: value,
    });
    this.#saveState();
  };

  newIDElement() {
    if (this.#state.length === 0) return this.#state.length;
    else {
      const lastID = this.#state[this.#state.length - 1].id;
      return lastID + 1;
    }
  }

  get state() {
    return this.#state;
  }

  updateStickyNote(id, text) {
    this.#state.forEach(note => {
      if (note.id === id) {
        note.text = text;
        this.#saveState();
      }
    });
  }

  deleteStickyNote(id) {
    this.#state = this.#state.filter(note => note.id !== id);
    this.#saveState();
  }

  loadStickyNotes() {
    this.#state = this.#loadState();
  }

  #saveState() {
    localStorage.setItem('saved-notes', JSON.stringify(this.#state));
  }

  #loadState() {
    const notes = localStorage.getItem('saved-notes');
    return notes ? JSON.parse(notes) : [];
  }
}
