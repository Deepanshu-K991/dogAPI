(function () {
    const API_KEY = 'live_gJeLtahcLnkNttF7cp159B6KfJmQ0lIHqtkWM6uuWrAysxEXZ7U6N7L1JUUCkMGR';
    const DOGS_API = 'https://api.thedogapi.com/v1/images/search?limit=12&has_breeds=1';

    const dogsContainer = document.getElementById('dogs');
    const errorBox = document.getElementById('error');
    const loader = document.getElementById('loader');
    const reloadButton = document.getElementById('reload-btn');

    function setLoading(isLoading) {
        if (isLoading) {
            loader.hidden = false;
            loader.setAttribute('aria-hidden', 'false');
            reloadButton.disabled = true;
        } else {
            loader.hidden = true;
            loader.setAttribute('aria-hidden', 'true');
            reloadButton.disabled = false;
        }
    }

    function showError(message) {
        errorBox.textContent = message;
        errorBox.hidden = false;
    }

    function clearError() {
        errorBox.textContent = '';
        errorBox.hidden = true;
    }

    function preloadImages(urls) {
        return Promise.all(urls.map(function (url) {
            return new Promise(function (resolve) {
                const img = new Image();
                img.onload = function () { resolve({ url: url, ok: true }); };
                img.onerror = function () { resolve({ url: url, ok: false }); };
                img.src = url;
            });
        }));
    }

    function buildDogCard(item) {
        const card = document.createElement('article');
        card.className = 'card';

        const media = document.createElement('div');
        media.className = 'card-media';
        const img = document.createElement('img');
        img.src = item.url;
        const breed = (item.breeds && item.breeds[0]) || {};
        const breedName = breed.name || 'Unknown breed';
        img.alt = breedName;
        media.appendChild(img);

        const body = document.createElement('div');
        body.className = 'card-body';

        const name = document.createElement('h2');
        name.className = 'name';
        name.textContent = breedName;

        const temperament = document.createElement('p');
        temperament.className = 'muted';
        temperament.textContent = breed.temperament || 'Temperament: N/A';

        const meta = document.createElement('p');
        meta.className = 'meta';
        const weight = breed.weight && breed.weight.metric ? `${breed.weight.metric} kg` : 'N/A';
        const height = breed.height && breed.height.metric ? `${breed.height.metric} cm` : 'N/A';
        const lifeSpan = breed.life_span || 'N/A';
        meta.textContent = `Weight: ${weight}  •  Height: ${height}  •  Life: ${lifeSpan}`;

        body.appendChild(name);
        body.appendChild(temperament);
        body.appendChild(meta);

        card.appendChild(media);
        card.appendChild(body);
        return card;
    }

    async function fetchDogs() {
        clearError();
        setLoading(true);
        dogsContainer.innerHTML = '';
        try {
            const response = await fetch(DOGS_API, {
                headers: { 'x-api-key': API_KEY },
                cache: 'no-store'
            });
            if (!response.ok) {
                throw new Error(`Request failed: ${response.status}`);
            }
            const items = await response.json();
            if (!Array.isArray(items)) {
                throw new Error('Unexpected response shape');
            }
            if (items.length === 0) {
                dogsContainer.textContent = 'No dogs found.';
                setLoading(false);
                return;
            }

            // Preload images before rendering to ensure loader stops when visuals are ready
            const urls = items.map(function (i) { return i.url; });
            await preloadImages(urls);

            const fragment = document.createDocumentFragment();
            for (const item of items) {
                fragment.appendChild(buildDogCard(item));
            }
            dogsContainer.appendChild(fragment);

            // Stop loading only after cards are rendered
            setLoading(false);
        } catch (err) {
            showError(`Could not load dogs. ${err.message || err}`);
        } finally {
            // Safety to ensure loader is not left spinning on unexpected paths
            setLoading(false);
        }
    }

    reloadButton.addEventListener('click', function () {
        fetchDogs();
    });

    // Initial load
    fetchDogs();
})();



