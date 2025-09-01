// Quotes Management System
class QuotesManager {
    constructor() {
        this.quotes = this.loadQuotes();
        this.currentQuoteIndex = 0;
        this.currentEditId = null;
        this.rotationInterval = null;
        this.init();
    }

    init() {
        this.renderQuoteDisplay();
        this.setupEventListeners();
        this.startAutoRotation();
    }

    loadQuotes() {
        const savedQuotes = localStorage.getItem('portfolio_quotes');
        if (savedQuotes) {
            return JSON.parse(savedQuotes);
        }
        
        // Default quotes
        return [
            {
                id: 'quote_1',
                text: 'The only way to do great work is to love what you do.',
                author: 'Steve Jobs',
                createdAt: new Date().toISOString()
            },
            {
                id: 'quote_2',
                text: 'Innovation distinguishes between a leader and a follower.',
                author: 'Steve Jobs',
                createdAt: new Date().toISOString()
            },
            {
                id: 'quote_3',
                text: 'Code is like humor. When you have to explain it, it\'s bad.',
                author: 'Cory House',
                createdAt: new Date().toISOString()
            },
            {
                id: 'quote_4',
                text: 'First, solve the problem. Then, write the code.',
                author: 'John Johnson',
                createdAt: new Date().toISOString()
            },
            {
                id: 'quote_5',
                text: 'Experience is the name everyone gives to their mistakes.',
                author: 'Oscar Wilde',
                createdAt: new Date().toISOString()
            }
        ];
    }

    saveQuotes() {
        localStorage.setItem('portfolio_quotes', JSON.stringify(this.quotes));
    }

    renderQuoteDisplay() {
        const quoteDisplay = document.getElementById('quote-display');
        if (!quoteDisplay || this.quotes.length === 0) return;

        const currentQuote = this.quotes[this.currentQuoteIndex];
        quoteDisplay.innerHTML = `
            <p class="quote-text">"${currentQuote.text}"</p>
            <p class="quote-author">- ${currentQuote.author}</p>
        `;
    }

    renderQuotesList() {
        const quotesList = document.getElementById('quotes-list');
        if (!quotesList) return;

        quotesList.innerHTML = '';

        this.quotes.forEach((quote, index) => {
            const quoteItem = this.createQuoteItem(quote, index);
            quotesList.appendChild(quoteItem);
        });

        // Add empty state if no quotes
        if (this.quotes.length === 0) {
            quotesList.innerHTML = `
                <div class="empty-state curved-border">
                    <i class="fas fa-quote-left"></i>
                    <h3>No Quotes Yet</h3>
                    <p>Add some inspiring quotes to motivate your visitors!</p>
                    <button class="btn-primary" onclick="openQuoteModal()">
                        <i class="fas fa-plus"></i>
                        <span>Add Your First Quote</span>
                    </button>
                </div>
            `;
        }
    }

    createQuoteItem(quote, index) {
        const item = document.createElement('div');
        item.className = `quote-item ${index === this.currentQuoteIndex ? 'active' : ''}`;
        item.innerHTML = `
            <div class="quote-content">
                <p class="quote-text">"${quote.text}"</p>
                <p class="quote-author">- ${quote.author}</p>
            </div>
            <div class="quote-controls">
                <button class="control-btn edit" onclick="editQuote('${quote.id}')" title="Edit Quote">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="control-btn delete" onclick="deleteQuote('${quote.id}')" title="Delete Quote">
                    <i class="fas fa-trash"></i>
                </button>
                <button class="control-btn show" onclick="showQuote(${index})" title="Show Quote">
                    <i class="fas fa-eye"></i>
                </button>
            </div>
        `;
        return item;
    }

    setupEventListeners() {
        // Quote navigation
        const prevBtn = document.getElementById('prev-quote');
        const nextBtn = document.getElementById('next-quote');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.previousQuote());
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextQuote());
        }

        // Form submission
        const form = document.getElementById('quote-form');
        if (form) {
            form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    startAutoRotation() {
        if (this.quotes.length <= 1) return;
        
        this.rotationInterval = setInterval(() => {
            this.nextQuote();
        }, 5000); // Change quote every 5 seconds
    }

    stopAutoRotation() {
        if (this.rotationInterval) {
            clearInterval(this.rotationInterval);
            this.rotationInterval = null;
        }
    }

    nextQuote() {
        if (this.quotes.length === 0) return;
        this.currentQuoteIndex = (this.currentQuoteIndex + 1) % this.quotes.length;
        this.renderQuoteDisplay();
        this.renderQuotesList();
    }

    previousQuote() {
        if (this.quotes.length === 0) return;
        this.currentQuoteIndex = this.currentQuoteIndex === 0 ? this.quotes.length - 1 : this.currentQuoteIndex - 1;
        this.renderQuoteDisplay();
        this.renderQuotesList();
    }

    showQuote(index) {
        this.currentQuoteIndex = index;
        this.renderQuoteDisplay();
        this.renderQuotesList();
        this.stopAutoRotation();
        this.startAutoRotation(); // Restart rotation from new position
    }

    handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        const quoteData = {
            text: formData.get('text'),
            author: formData.get('author')
        };

        if (this.currentEditId) {
            this.updateQuote(this.currentEditId, quoteData);
        } else {
            this.addQuote(quoteData);
        }

        this.closeModal();
        this.renderQuoteDisplay();
        this.renderQuotesList();
    }

    addQuote(quoteData) {
        const newQuote = {
            id: 'quote_' + Date.now(),
            ...quoteData,
            createdAt: new Date().toISOString()
        };
        
        this.quotes.push(newQuote);
        this.saveQuotes();
        
        // Restart rotation if this is the first quote or if rotation was stopped
        if (this.quotes.length === 1 || !this.rotationInterval) {
            this.stopAutoRotation();
            this.startAutoRotation();
        }
        
        this.showNotification('Quote added successfully!', 'success');
    }

    updateQuote(id, quoteData) {
        const index = this.quotes.findIndex(q => q.id === id);
        if (index !== -1) {
            this.quotes[index] = {
                ...this.quotes[index],
                ...quoteData,
                updatedAt: new Date().toISOString()
            };
            this.saveQuotes();
            this.showNotification('Quote updated successfully!', 'success');
        }
    }

    editQuote(id) {
        const quote = this.quotes.find(q => q.id === id);
        if (!quote) return;

        this.currentEditId = id;
        
        // Fill form with quote data
        document.getElementById('quote-text').value = quote.text;
        document.getElementById('quote-author').value = quote.author;
        
        // Update modal title
        document.getElementById('quote-modal-title').textContent = 'Edit Quote';
        document.getElementById('quote-submit-text').textContent = 'Update Quote';
        
        this.openModal();
    }

    deleteQuote(id) {
        const quote = this.quotes.find(q => q.id === id);
        if (!quote) return;

        if (confirm(`Are you sure you want to delete this quote by ${quote.author}?`)) {
            const deletedIndex = this.quotes.findIndex(q => q.id === id);
            this.quotes = this.quotes.filter(q => q.id !== id);
            this.saveQuotes();
            
            // Adjust current index if necessary
            if (deletedIndex <= this.currentQuoteIndex && this.currentQuoteIndex > 0) {
                this.currentQuoteIndex--;
            } else if (this.currentQuoteIndex >= this.quotes.length) {
                this.currentQuoteIndex = 0;
            }
            
            // Stop rotation if no quotes left
            if (this.quotes.length === 0) {
                this.stopAutoRotation();
            }
            
            this.renderQuoteDisplay();
            this.renderQuotesList();
            this.showNotification('Quote deleted successfully!', 'success');
        }
    }

    openModal() {
        const modal = document.getElementById('quote-modal');
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    closeModal() {
        const modal = document.getElementById('quote-modal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        // Reset form and state
        document.getElementById('quote-form').reset();
        this.currentEditId = null;
        document.getElementById('quote-modal-title').textContent = 'Add New Quote';
        document.getElementById('quote-submit-text').textContent = 'Add Quote';
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => document.body.removeChild(notification), 300);
        }, 4000);
    }
}

// Global functions for HTML onclick handlers
let quotesManager;

function openQuoteModal() {
    quotesManager.openModal();
}

function closeQuoteModal() {
    quotesManager.closeModal();
}

function editQuote(id) {
    quotesManager.editQuote(id);
}

function deleteQuote(id) {
    quotesManager.deleteQuote(id);
}

function showQuote(index) {
    quotesManager.showQuote(index);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    quotesManager = new QuotesManager();
    
    // Close modal when clicking outside
    document.getElementById('quote-modal')?.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            closeQuoteModal();
        }
    });
});
