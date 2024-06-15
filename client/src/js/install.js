const butInstall = document.getElementById('buttonInstall');

//Logic for installing the PWA
//Event Handler to the `beforeinstallprompt` Event
window.addEventListener('beforeinstallprompt', (event) => {
    //Store the Events Triggered
    window.deferredPrompt = event;

    //Remove 'Hidden' Class from Button
    butInstall.classList.toggle('hidden', false)
});


//Click Event Handler on the `butInstall` Element
butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;

    //Check if Event is Triggered
    if (!promptEvent) {
        return;
    }

    //Show Install Prompt
    promptEvent.prompt();

    //Reset Deferred Prompt Variable (Can Only Be Used Once)
    window.deferredPrompt = null;

    //Add 'Hidden' Class to Button
    butInstall.classList.toggle('hidden', true);
});

//Handler for `appinstalled` Event
window.addEventListener('appinstalled', (event) => {
    //Clear Install Prompt
    window.deferredPrompt = null;
});