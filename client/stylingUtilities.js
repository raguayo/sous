function strikeThrough(e) {
  const currSetting = e.target.getAttribute('style');
  if (!currSetting || currSetting === 'text-decoration: none') {
    e.target.setAttribute('style', 'text-decoration: line-through');
  } else {
    e.target.setAttribute('style', 'text-decoration: none');
  }
}

module.exports = {
  strikeThrough,
};
