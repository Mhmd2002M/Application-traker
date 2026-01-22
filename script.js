document.addEventListener("DOMContentLoaded", () => {
  const jobForm = document.getElementById("jobForm");
  const jobList = document.getElementById("jobList");

  const searchInput = document.getElementById("search");
  const filterStatus = document.getElementById("filterStatus");

  let applications = JSON.parse(localStorage.getItem("applications")) || [];

  function renderApplications() {
    jobList.innerHTML = "";

    const searchValue = searchInput.value.toLowerCase();
    const statusValue = filterStatus.value;

    const filteredApps = applications.filter(app => {
      const matchesSearch =
        app.company.toLowerCase().includes(searchValue) ||
        app.role.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusValue === "All" ? true : app.status === statusValue;

      return matchesSearch && matchesStatus;
    });

    filteredApps.forEach((app, index) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${app.company}</td>
        <td>${app.role}</td>
        <td>${app.date}</td>
        <td>
  <span class="badge ${app.status.toLowerCase()}">
    ${app.status}
  </span>
</td>

        <td class="actions">
          <button class="edit" onclick="editApplication(${index})">Edit</button>
          <button class="delete" onclick="deleteApplication(${index})">Delete</button>
        </td>
      `;

      jobList.appendChild(row);
    });
  }

  jobForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const company = document.getElementById("company").value;
    const role = document.getElementById("role").value;
    const date = document.getElementById("date").value;
    const status = document.getElementById("status").value;

    applications.push({ company, role, date, status });

    localStorage.setItem("applications", JSON.stringify(applications));

    jobForm.reset();
    renderApplications();
  });

  window.deleteApplication = function(index) {
    applications.splice(index, 1);
    localStorage.setItem("applications", JSON.stringify(applications));
    renderApplications();
  };

  window.editApplication = function(index) {
    const app = applications[index];

    document.getElementById("company").value = app.company;
    document.getElementById("role").value = app.role;
    document.getElementById("date").value = app.date;
    document.getElementById("status").value = app.status;

    applications.splice(index, 1);
    localStorage.setItem("applications", JSON.stringify(applications));
    renderApplications();
  };

  searchInput.addEventListener("input", renderApplications);
  filterStatus.addEventListener("change", renderApplications);

  renderApplications();
});
