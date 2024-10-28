document.addEventListener('DOMContentLoaded', () => {
    const skinsContainer = document.getElementById('skins-container');
    const filterInput = document.getElementById('filter');

    fetch('https://raw.githubusercontent.com/hoccode241/youskins/refs/heads/main/champion_skins_data.json')
        .then(response => response.json())
        .then(skinsData => {
            skinsContainer.innerHTML = ''; // Clear previous content

            let row;
            let count = 0;

            const displaySkins = () => {
                skinsContainer.innerHTML = ''; // Clear previous content
                count = 0;

                const filterText = filterInput.value.toLowerCase();

                skinsData.forEach(champion => {
                    champion.skins.forEach(skin => {
                        if (skin.name.toLowerCase().includes(filterText)) {
                            if (count % 6 === 0) {
                                row = document.createElement('div');
                                row.style.display = 'flex';
                                row.style.flexWrap = 'wrap';
                                skinsContainer.appendChild(row);
                            }
                            count++;
                            
                            const skinItem = document.createElement('div');
                            skinItem.classList.add('skin-item');
                            skinItem.innerHTML = `
                                <div class="skin-info">
                                    <img src="${skin.borders}" alt="borders" class="borders">
                                    <img src="${skin.rarity}" alt="rarity" class="rarity">
                                    <img src="${skin.img}" alt="${skin.name}" class="img">
                                    <img src="${skin.imgb}" alt="imgb" class="imgb">
                                </div>
                                <div class="skin-name">${skin.name}</div>
                                <label class="switch">
                                    <input type="checkbox" class="toggle-input">
                                    <span class="slider round"></span>
                                </label>
                            `;
                            row.appendChild(skinItem);

                            // Add toggle functionality
                            skinItem.querySelector('.toggle-input').addEventListener('change', (event) => {
                                const imgbElement = skinItem.querySelector('.imgb');
                                if (event.target.checked) {
                                    imgbElement.style.display = 'block';
                                } else {
                                    imgbElement.style.display = 'none';
                                }
                            });
                        }
                    });
                });
            };

            filterInput.addEventListener('input', displaySkins);
            displaySkins();
        })
        .catch(error => console.error('Error loading JSON:', error));
});
