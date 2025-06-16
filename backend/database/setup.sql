
-- Lucky VPN Master Database Setup
-- Run this script to create the database and tables

CREATE DATABASE IF NOT EXISTS lucky_vpn_master;
USE lucky_vpn_master;

-- Users table
CREATE TABLE IF NOT EXISTS Users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    plan ENUM('free', 'premium') DEFAULT 'free',
    subscription_expires DATETIME NULL,
    points INT DEFAULT 0,
    referred_by INT NULL,
    status ENUM('active', 'blocked') DEFAULT 'active',
    last_login DATETIME NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (referred_by) REFERENCES Users(id)
);

-- Servers table
CREATE TABLE IF NOT EXISTS Servers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    country VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    ip VARCHAR(45) NOT NULL,
    port VARCHAR(10) DEFAULT '1194',
    protocol ENUM('OpenVPN', 'WireGuard', 'IKEv2') DEFAULT 'OpenVPN',
    type ENUM('free', 'premium') DEFAULT 'free',
    status ENUM('online', 'offline', 'maintenance') DEFAULT 'online',
    load_percentage INT DEFAULT 0,
    users INT DEFAULT 0,
    provider ENUM('manual', 'oneconnect') DEFAULT 'manual',
    oneconnect_id VARCHAR(100) NULL,
    config_file TEXT,
    last_sync DATETIME NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Payments table
CREATE TABLE IF NOT EXISTS Payments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    transaction_id VARCHAR(255) UNIQUE NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_method ENUM('kpay', 'wave', 'aya', 'cb', 'bank_transfer') NOT NULL,
    gateway_account VARCHAR(255) NOT NULL,
    plan_type ENUM('premium_monthly', 'premium_yearly') NOT NULL,
    duration INT NOT NULL,
    screenshot TEXT,
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    admin_notes TEXT,
    approved_at DATETIME NULL,
    approved_by INT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (approved_by) REFERENCES Admins(id)
);

-- Rewards table
CREATE TABLE IF NOT EXISTS Rewards (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    type ENUM('daily', 'ad', 'referral', 'bonus') NOT NULL,
    points INT NOT NULL,
    description VARCHAR(255),
    claimed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

-- Admins table
CREATE TABLE IF NOT EXISTS Admins (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'super_admin') DEFAULT 'admin',
    status ENUM('active', 'inactive') DEFAULT 'active',
    last_login DATETIME NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- OneConnect Configuration table
CREATE TABLE IF NOT EXISTS OneConnectConfigs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    api_url VARCHAR(255) NOT NULL,
    api_key VARCHAR(255) NOT NULL,
    auto_sync BOOLEAN DEFAULT FALSE,
    sync_interval INT DEFAULT 60,
    last_sync DATETIME NULL,
    status ENUM('active', 'inactive') DEFAULT 'active',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Ad Configuration table
CREATE TABLE IF NOT EXISTS AdConfigs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    admob_app_id VARCHAR(255),
    admob_banner_id VARCHAR(255),
    admob_interstitial_id VARCHAR(255),
    admob_rewarded_id VARCHAR(255),
    facebook_app_id VARCHAR(255),
    facebook_banner_id VARCHAR(255),
    facebook_interstitial_id VARCHAR(255),
    facebook_rewarded_id VARCHAR(255),
    unity_game_id VARCHAR(255),
    unity_banner_id VARCHAR(255),
    unity_interstitial_id VARCHAR(255),
    unity_rewarded_id VARCHAR(255),
    primary_network ENUM('admob', 'facebook', 'unity') DEFAULT 'admob',
    show_ads BOOLEAN DEFAULT TRUE,
    ad_frequency INT DEFAULT 3,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Notifications table
CREATE TABLE IF NOT EXISTS Notifications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type ENUM('general', 'payment', 'server', 'promotion') DEFAULT 'general',
    is_read BOOLEAN DEFAULT FALSE,
    action_url VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

-- Support Tickets table
CREATE TABLE IF NOT EXISTS SupportTickets (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    category ENUM('technical', 'billing', 'general') DEFAULT 'general',
    status ENUM('open', 'in_progress', 'resolved', 'closed') DEFAULT 'open',
    priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
    admin_response TEXT,
    resolved_at DATETIME NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

-- Blog Posts table
CREATE TABLE IF NOT EXISTS BlogPosts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    featured_image VARCHAR(255),
    status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
    author_id INT NOT NULL,
    views INT DEFAULT 0,
    tags JSON,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES Admins(id)
);

-- User Connections table
CREATE TABLE IF NOT EXISTS UserConnections (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    server_id INT NOT NULL,
    connected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    disconnected_at DATETIME NULL,
    duration INT NULL,
    data_used BIGINT DEFAULT 0,
    ip_address VARCHAR(45),
    device_info JSON,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (server_id) REFERENCES Servers(id)
);

-- Insert default admin user
INSERT INTO Admins (name, email, password, role) VALUES 
('Admin', 'admin@luckyvpn.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'super_admin');

-- Insert sample servers
INSERT INTO Servers (name, country, city, ip, port, protocol, type, status) VALUES 
('Singapore Server 1', 'Singapore', 'Singapore', '103.253.147.10', '1194', 'OpenVPN', 'free', 'online'),
('Japan Server 1', 'Japan', 'Tokyo', '103.253.147.11', '1194', 'OpenVPN', 'premium', 'online'),
('USA Server 1', 'United States', 'New York', '103.253.147.12', '1194', 'OpenVPN', 'premium', 'online'),
('Thailand Server 1', 'Thailand', 'Bangkok', '103.253.147.13', '1194', 'OpenVPN', 'free', 'online');

-- Insert default ad configuration
INSERT INTO AdConfigs (
    admob_app_id, 
    admob_banner_id, 
    admob_interstitial_id, 
    admob_rewarded_id,
    primary_network,
    show_ads,
    ad_frequency
) VALUES (
    'ca-app-pub-3940256099942544~3347511713',
    'ca-app-pub-3940256099942544/6300978111',
    'ca-app-pub-3940256099942544/1033173712',
    'ca-app-pub-3940256099942544/5224354917',
    'admob',
    TRUE,
    3
);
