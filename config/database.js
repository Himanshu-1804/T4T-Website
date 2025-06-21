// Database Configuration for Teens 4 Teens

class DatabaseManager {
  constructor() {
    this.dbName = 'teens4teens_db';
    this.version = 1;
    this.db = null;
    this.init();
  }

  async init() {
    try {
      // Initialize IndexedDB for client-side storage
      await this.initIndexedDB();
      
      // Initialize mock data
      await this.initMockData();
      
      console.log('Database initialized successfully');
    } catch (error) {
      console.error('Database initialization failed:', error);
    }
  }

  async initIndexedDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => {
        reject(new Error('Failed to open database'));
      };

      request.onsuccess = (event) => {
        this.db = event.target.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        // Create object stores
        if (!db.objectStoreNames.contains('users')) {
          const userStore = db.createObjectStore('users', { keyPath: 'id', autoIncrement: true });
          userStore.createIndex('email', 'email', { unique: true });
          userStore.createIndex('role', 'role', { unique: false });
        }

        if (!db.objectStoreNames.contains('chapters')) {
          const chapterStore = db.createObjectStore('chapters', { keyPath: 'id', autoIncrement: true });
          chapterStore.createIndex('school', 'school', { unique: false });
          chapterStore.createIndex('location', 'location', { unique: false });
        }

        if (!db.objectStoreNames.contains('donations')) {
          const donationStore = db.createObjectStore('donations', { keyPath: 'id', autoIncrement: true });
          donationStore.createIndex('userId', 'userId', { unique: false });
          donationStore.createIndex('date', 'date', { unique: false });
        }

        if (!db.objectStoreNames.contains('volunteers')) {
          const volunteerStore = db.createObjectStore('volunteers', { keyPath: 'id', autoIncrement: true });
          volunteerStore.createIndex('userId', 'userId', { unique: true });
          volunteerStore.createIndex('chapterId', 'chapterId', { unique: false });
        }

        if (!db.objectStoreNames.contains('products')) {
          const productStore = db.createObjectStore('products', { keyPath: 'id', autoIncrement: true });
          productStore.createIndex('type', 'type', { unique: false });
          productStore.createIndex('status', 'status', { unique: false });
        }

        if (!db.objectStoreNames.contains('distributions')) {
          const distributionStore = db.createObjectStore('distributions', { keyPath: 'id', autoIncrement: true });
          distributionStore.createIndex('chapterId', 'chapterId', { unique: false });
          distributionStore.createIndex('date', 'date', { unique: false });
        }
      };
    });
  }

  async initMockData() {
    // Add mock users
    const mockUsers = [
      {
        id: 1,
        email: 'admin@teens4teens.net',
        password: 'admin123',
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin',
        age: 25,
        school: 'Teens 4 Teens HQ',
        createdAt: new Date(),
        isActive: true
      },
      {
        id: 2,
        email: 'volunteer@example.com',
        password: 'volunteer123',
        firstName: 'Sarah',
        lastName: 'Johnson',
        role: 'volunteer',
        age: 18,
        school: 'Lincoln High School',
        createdAt: new Date(),
        isActive: true
      },
      {
        id: 3,
        email: 'student@example.com',
        password: 'student123',
        firstName: 'Maria',
        lastName: 'Garcia',
        role: 'student',
        age: 16,
        school: 'Central High School',
        createdAt: new Date(),
        isActive: true
      }
    ];

    // Add mock chapters
    const mockChapters = [
      {
        id: 1,
        name: 'Lincoln High School Chapter',
        school: 'Lincoln High School',
        location: 'New York, NY',
        leaderId: 2,
        memberCount: 45,
        createdAt: new Date(),
        isActive: true
      },
      {
        id: 2,
        name: 'Central High School Chapter',
        school: 'Central High School',
        location: 'Charlotte, NC',
        leaderId: 3,
        memberCount: 32,
        createdAt: new Date(),
        isActive: true
      }
    ];

    // Add mock donations
    const mockDonations = [
      {
        id: 1,
        userId: 2,
        amount: 50.00,
        type: 'monetary',
        date: new Date(),
        message: 'Supporting the cause!',
        isAnonymous: false
      },
      {
        id: 2,
        userId: 3,
        amount: 25.00,
        type: 'monetary',
        date: new Date(),
        message: 'Every dollar counts!',
        isAnonymous: true
      }
    ];

    // Add mock products
    const mockProducts = [
      {
        id: 1,
        type: 'pads',
        quantity: 1000,
        brand: 'Generic',
        status: 'available',
        chapterId: 1,
        dateAdded: new Date()
      },
      {
        id: 2,
        type: 'tampons',
        quantity: 800,
        brand: 'Generic',
        status: 'available',
        chapterId: 1,
        dateAdded: new Date()
      }
    ];

    // Insert mock data
    await this.insertMany('users', mockUsers);
    await this.insertMany('chapters', mockChapters);
    await this.insertMany('donations', mockDonations);
    await this.insertMany('products', mockProducts);
  }

  async insert(storeName, data) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.add(data);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async insertMany(storeName, dataArray) {
    const promises = dataArray.map(data => this.insert(storeName, data));
    return Promise.all(promises);
  }

  async get(storeName, id) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.get(id);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async getAll(storeName) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async update(storeName, data) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.put(data);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async delete(storeName, id) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.delete(id);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async query(storeName, indexName, value) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const index = store.index(indexName);
      const request = index.getAll(value);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  // User-specific methods
  async getUserByEmail(email) {
    const users = await this.query('users', 'email', email);
    return users[0] || null;
  }

  async createUser(userData) {
    const user = {
      ...userData,
      createdAt: new Date(),
      isActive: true
    };
    return this.insert('users', user);
  }

  async updateUser(id, updates) {
    const user = await this.get('users', id);
    if (!user) throw new Error('User not found');
    
    const updatedUser = { ...user, ...updates };
    return this.update('users', updatedUser);
  }

  // Chapter-specific methods
  async getChaptersByLocation(location) {
    return this.query('chapters', 'location', location);
  }

  async createChapter(chapterData) {
    const chapter = {
      ...chapterData,
      createdAt: new Date(),
      isActive: true
    };
    return this.insert('chapters', chapter);
  }

  // Donation-specific methods
  async getDonationsByUser(userId) {
    return this.query('donations', 'userId', userId);
  }

  async createDonation(donationData) {
    const donation = {
      ...donationData,
      date: new Date()
    };
    return this.insert('donations', donation);
  }

  // Product-specific methods
  async getProductsByChapter(chapterId) {
    return this.query('products', 'chapterId', chapterId);
  }

  async updateProductQuantity(productId, newQuantity) {
    const product = await this.get('products', productId);
    if (!product) throw new Error('Product not found');
    
    product.quantity = newQuantity;
    return this.update('products', product);
  }

  // Statistics methods
  async getStatistics() {
    const users = await this.getAll('users');
    const chapters = await this.getAll('chapters');
    const donations = await this.getAll('donations');
    const products = await this.getAll('products');

    return {
      totalUsers: users.length,
      totalChapters: chapters.length,
      totalDonations: donations.length,
      totalDonationAmount: donations.reduce((sum, d) => sum + d.amount, 0),
      totalProducts: products.reduce((sum, p) => sum + p.quantity, 0)
    };
  }
}

// Initialize database manager
const dbManager = new DatabaseManager();

// Export for use in other files
window.dbManager = dbManager; 