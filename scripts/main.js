document.addEventListener('DOMContentLoaded', () => {
  fetch('php/get_schedule.php')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.querySelector('#schedule-table tbody');
      tableBody.innerHTML = '';
      data.forEach(match => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${match.match_date}</td>
          <td>${match.match_time}</td>
          <td>${match.team1_name}</td>
          <td>${match.team2_name}</td>
          <td>${match.venue}</td>
        `;
        row.addEventListener('click', () => {
          window.open('https://www.example.com', '_blank');
        });
        tableBody.appendChild(row);
      });
    })
    .catch(error => console.error('Error fetching schedule:', error));
});

window.addEventListener('scroll', () => {
  let scrolled = window.scrollY;
  document.querySelector('.parallax').style.backgroundPositionY = -(scrolled * 0.5) + 'px';
  
  const backToTop = document.getElementById('back-to-top');
  if (scrolled > 300) {
    backToTop.style.display = 'block';
  } else {
    backToTop.style.display = 'none';
  }
});

document.getElementById('back-to-top').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


document.addEventListener("DOMContentLoaded", function() {
  const hamburger = document.querySelector('.hamburger');
  const sideNav = document.querySelector('nav.side-nav');
    
  if (hamburger && sideNav) {
    // Toggle side nav on hamburger click
    hamburger.addEventListener('click', function(e) {
      e.stopPropagation(); // Prevent event from bubbling up to document
      sideNav.classList.toggle('open');
    });
      
      // Prevent clicks inside the side nav from closing it
    sideNav.addEventListener('click', function(e) {
      e.stopPropagation();
    });
      
      // Listen for clicks on the document to close the side nav if it's open
    document.addEventListener('click', function(e) {
      if (sideNav.classList.contains('open')) {
        // If the click is outside the side nav and hamburger, close the nav
        if (!sideNav.contains(e.target) && !hamburger.contains(e.target)) {
          sideNav.classList.remove('open');
        }
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // Select all elements you want to animate
  const faders = document.querySelectorAll('.fade-in');

  // Set up the options for the observer
  const appearOptions = {
    threshold: 0.5, // trigger when 50% of the element is visible
    rootMargin: "0px 0px -100px 0px"
  };

  // Create the observer
  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('appear');
        observer.unobserve(entry.target); // Optional: remove observer after animation
      }
    });
  }, appearOptions);

  // Observe each fade-in element
  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });
});
