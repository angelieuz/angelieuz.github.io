function downloadData() {
  event.preventDefault();
  var startdate = document.getElementById("startdate").value;
  var enddate = document.getElementById("enddate").value;
  alert(startdate);
  alert(enddate);
}
function fetchData() {
  const url = 'https://compute.samford.edu/zohauth/clients/datajson';

  fetch(url)
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => {
          const table = document.getElementById('data-table');
          
          data.forEach(item => {
              const row = document.createElement('tr');
              
              const idCell = document.createElement('td');
              const link = document.createElement('a');
              link.href = 'details.html';
              link.textContent = `Pitch ${item.id}`; // Assuming item.id exists
              idCell.appendChild(link);
              
              const speedCell = document.createElement('td');
              speedCell.textContent = item.speed; // Assuming item.speed exists
              
              const resultCell = document.createElement('td');
              resultCell.textContent = item.result || '--'; // Assuming item.result exists
              
              const datetimeCell = document.createElement('td');
              datetimeCell.textContent = item.datetime; // Assuming item.datetime exists
              
              row.appendChild(idCell);
              row.appendChild(speedCell);
              row.appendChild(resultCell);
              row.appendChild(datetimeCell);
              
              table.appendChild(row);
          });
      })
      .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
      });
}

// Call the fetchData function to load the data
fetchData();