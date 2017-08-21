function strikeThrough(e) {
  const currSetting = e.target.getAttribute('style');
  if (!currSetting || currSetting === 'text-decoration: none') {
    e.target.setAttribute('style', 'text-decoration: line-through');
    return true;
  } else {
    e.target.setAttribute('style', 'text-decoration: none');
    return false;
  }
}

module.exports = {
  strikeThrough,
};
