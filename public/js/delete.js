let deleteForm = document.getElementById('deleteForm');
deleteForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (event.target.dataset.id) {
    let resultFetch = await fetch(`http://localhost:3001/posts/delete/${event.target.dataset.id}`, {
      method: 'DELETE',
    });
    let finalResultFetch = await resultFetch.json();
    console.log(finalResultFetch)
  }
});
