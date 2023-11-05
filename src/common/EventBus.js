const eventBus = {
  // funkcja eventBus bedzie nasluchiwac na zdarzenia i wywolywac callbacki
  on(event, callback) {
    document.addEventListener(event, (e) => callback(e.detail));
  },
  dispatch(event, data) {
    // funkcja dispatch bedzie wywolywac zdarzenia
    document.dispatchEvent(new CustomEvent(event, { detail: data }));
  },
  remove(event, callback) {
    // funkcja remove bedzie usuwac nasluchiwanie na zdarzenia
    document.removeEventListener(event, callback);
  },
};

export default eventBus;
