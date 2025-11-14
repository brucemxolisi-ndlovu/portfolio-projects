// Contact Book Application
class ContactBook {
    constructor() {
        this.contacts = this.loadContacts();
        this.editingId = null;
        this.sortAscending = true;
        this.currentavatar = null;

        this.initializeEventListerners();
        this.renderContacts();
        this.updateContactCount();
    }

    initializeEventListerners() {
        // Form submission
        document.getElementById('contactForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit();
        });
        
        // Avatar upload
        documenbt.getElementById(avatarInput).addEventListener('change', (e) => {
            this.handleAvatarUpload(e);
        });

        // Search functionality
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.renderSearch(e.target.value);
        });







    }




}