class Subject {
  addObserver (observer) {
    throw new Error("addObserver() not defined.");
  }
  removeObserver (observer) {
    throw new Error("removeObserver() not defined.");
  }
  notifyObservers () {
    throw new Error("notifyObservers() not defined.");
  }
}

module.exports = Subject;