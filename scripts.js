document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.getElementById('menu');

    menuToggle.addEventListener('click', function() {
        if (menu.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    document.addEventListener('click', function (event) {
        const target = event.target;
        if (!menu.contains(target) && !menuToggle.contains(target)) {
            closeMenu();
        }
    });

    function openMenu() {
        menu.classList.add('active');
        menu.classList.remove('hidden');
        document.body.classList.add('menu-open');
    }

    function closeMenu() {
        menu.classList.add('hidden');
        menu.classList.remove('active');
        document.body.classList.remove('menu-open');
    }

    var mainGallery = new Swiper('.main-gallery', {
        slidesPerView: 1,
        spaceBetween: 10,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });

    var thumbnailGallery = new Swiper('.thumbnail-gallery', {
        slidesPerView: 5,
        spaceBetween: 10,
        slideToClickedSlide: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
    });

    mainGallery.controller.control = thumbnailGallery;
    thumbnailGallery.controller.control = mainGallery;
});

function editRow(row) {
    const cells = row.cells;
    for (let i = 1; i < cells.length - 1; i++) {
        let currentValue = cells[i].textContent;
        let input = document.createElement('input');
        input.type = 'text';
        input.value = currentValue;
        cells[i].innerHTML = '';
        cells[i].appendChild(input);
    }
    const editButton = row.querySelector('.edit-button');
    editButton.textContent = 'Simpan';
    editButton.classList.add('save-button');
    editButton.classList.remove('edit-button');
}

function saveRow(row) {
    const cells = row.cells;
    for (let i = 1; i < cells.length - 1; i++) {
        let newValue = cells[i].querySelector('input').value;
        cells[i].innerHTML = newValue;
    }
    const saveButton = row.querySelector('.save-button');
    saveButton.textContent = 'Edit';
    saveButton.classList.add('edit-button');
    saveButton.classList.remove('save-button');
}

document.querySelector('tbody').addEventListener('click', function (event) {
    if (event.target.classList.contains('edit-button')) {
        editRow(event.target.closest('tr'));
    } else if (event.target.classList.contains('save-button')) {
        saveRow(event.target.closest('tr'));
    }
});

function addNewSiswaKelas1() {
    const table = document.getElementById('kelas1-table');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>3</td>
        <td>Siswa Tanpa Keterangan</td>
        <td>1C</td>
        <td>0</td>
        <td>21</td>
        <td>0</td>
        <td>0</td>
        <td>Perempuan</td>
        <td><button class="edit-button">Edit</button></td>
    `;
    table.querySelector('tbody').appendChild(newRow);

    var data = 'nama_siswa=Siswa Tanpa Keterangan&gender=Perempuan&dob=&email=&phone=&address=';
    saveDataToServer(data);
}

function addNewSiswaKelas2() {
    const table = document.getElementById('kelas2-table');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>3</td>
        <td>Siswa Tanpa Keterangan</td>
        <td>2C</td>
        <td>0</td>
        <td>20</td>
        <td>1</td>
        <td>0</td>
        <td>Laki-laki</td>
        <td><button class="edit-button">Edit</button></td>
    `;
    table.querySelector('tbody').appendChild(newRow);

    var data = 'nama_siswa=Siswa Tanpa Keterangan&gender=Laki-laki&dob=&email=&phone=&address=';
    saveDataToServer(data);
}

const addSiswaKelas1Button = document.getElementById('add-siswa-kelas1');
addSiswaKelas1Button.addEventListener('click', function () {
    addNewSiswaKelas1();
});

const addSiswaKelas2Button = document.getElementById('add-siswa-kelas2');
addSiswaKelas2Button.addEventListener('click', function () {
    addNewSiswaKelas2();
});

function saveDataToServer(data) {
    const xhr = new XMLHttpRequest();
    const url = 'save_data.php';

    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                console.log('Data siswa berhasil disimpan.');
            } else {
                console.error('Terjadi kesalahan saat menyimpan data:', xhr.status);
            }
        }
    };

    xhr.send(data);
}

function redirectToWhatsApp(event) {
    event.preventDefault();

    var name = document.getElementById("name").value.trim();
    var gender = document.getElementById("gender").value;
    var dob = document.getElementById("dob").value;
    var email = document.getElementById("email").value.trim();
    var phone = document.getElementById("phone").value.trim();
    var address = document.getElementById("address").value.trim();

    var data = 'nama_siswa=' + encodeURIComponent(name) +
               '&gender=' + encodeURIComponent(gender) +
               '&dob=' + encodeURIComponent(dob) +
               '&email=' + encodeURIComponent(email) +
               '&phone=' + encodeURIComponent(phone) +
               '&address=' + encodeURIComponent(address);

    saveDataToServer(data);

    var whatsappUrl = "https://wa.me/6281354615964"; //ganti nomor
    window.location.href = whatsappUrl;
}
