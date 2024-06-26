document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector('.php-email-form');
    form.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const loading = form.querySelector('.loading');
      const errorMessage = form.querySelector('.error-message');
      const sentMessage = form.querySelector('.sent-message');
  
      loading.style.display = 'block';
      errorMessage.style.display = 'none';
      sentMessage.style.display = 'none';
  
      const formData = new FormData(form);
  
      fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      }).then(response => {
        loading.style.display = 'none';
        if (response.ok) {
          sentMessage.style.display = 'block';
          form.reset();
        } else {
          response.json().then(data => {
            if (data.hasOwnProperty('errors')) {
              errorMessage.textContent = data["errors"].map(error => error["message"]).join(", ");
            } else {
              errorMessage.textContent = "Erreur lors de l'envoi du message.";
            }
            errorMessage.style.display = 'block';
          });
        }
      }).catch(() => {
        loading.style.display = 'none';
        errorMessage.textContent = "Erreur lors de l'envoi du message.";
        errorMessage.style.display = 'block';
      });
    });
  });
  