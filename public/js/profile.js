const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#adoptable-name').value.trim();
  const age = document.querySelector('#adoptable-age').value.trim();
  const description = document.querySelector('#adoptable-desc').value.trim();

  if (name && age && description) {
    const response = await fetch(`/api/Adoptable`, {
      method: 'POST',
      body: JSON.stringify({ name, age, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to post adoption');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    const response = await fetch(`/api/adoptable/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to post adoption');
    }
  }
};

document
  .querySelector('.new-adoption-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.adoption-list')
  .addEventListener('click', delButtonHandler);
