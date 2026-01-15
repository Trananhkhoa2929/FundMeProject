# 🧪 HƯỚNG DẪN TEST DONATION - KHÔNG CẦN ETH THẬT

## ⚡ CÁCH 1: Local Hardhat Network (NHANH NHẤT - KHUYÊN DÙNG)

### Bước 1: Chạy Hardhat local node (Terminal 1)
```bash
cd contracts
npx hardhat node
```
Lệnh này sẽ:
- Tạo một blockchain local tại http://127.0.0.1:8545
- Tự động tạo 20 accounts với mỗi account có **10,000 ETH fake**
- In ra danh sách accounts và private keys

### Bước 2: Deploy contract (Terminal 2 - giữ Terminal 1 chạy)
```bash
cd contracts
npx hardhat run scripts/deploy.js --network localhost
```
**SAO CHÉP CONTRACT ADDRESS** từ output!

### Bước 3: Cập nhật contract address trong frontend
Mở file `gofundme/src/utils/utilFunctions.js` và thay đổi:
```javascript
const contractAddress = "PASTE_YOUR_CONTRACT_ADDRESS_HERE";
```

### Bước 4: Cấu hình MetaMask cho Local Network
1. Mở MetaMask
2. Click network dropdown → **Add Network** → **Add a network manually**
3. Điền thông tin:
   - **Network Name**: Hardhat Local
   - **RPC URL**: http://127.0.0.1:8545
   - **Chain ID**: 1337
   - **Currency Symbol**: ETH
4. Click **Save**

### Bước 5: Import test account vào MetaMask
1. Copy **Account #0 Private Key** từ Terminal 1 (hardhat node)
2. MetaMask → Click account icon → **Import Account**
3. Paste private key → **Import**
4. Account này có **10,000 ETH fake** để test!

### Bước 6: Chạy frontend
```bash
cd gofundme
npm start
```

### Bước 7: Test Donation
1. Đảm bảo MetaMask đang kết nối với **Hardhat Local** network
2. Connect wallet trong app
3. Donate bất kỳ amount nào (bạn có 10,000 ETH!)
4. Confirm transaction trong MetaMask

---

## 🌐 CÁCH 2: Sepolia Testnet (Cần lấy ETH từ Faucet)

### Bước 1: Lấy Sepolia ETH miễn phí
Truy cập các faucet này và nhập địa chỉ ví MetaMask:
- https://sepoliafaucet.com/
- https://www.alchemy.com/faucets/ethereum-sepolia
- https://faucet.quicknode.com/ethereum/sepolia

Mỗi lần claim được ~0.5 ETH Sepolia

### Bước 2: Setup .env file
```bash
cd contracts
cp .env.example .env
```
Chỉnh sửa `.env`:
```
SEPOLIA_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_ALCHEMY_KEY
PRIVATE_KEY=your_metamask_private_key
```

### Bước 3: Deploy lên Sepolia
```bash
cd contracts
npx hardhat run scripts/deploy.js --network sepolia
```

### Bước 4: Update contract address trong frontend
Giống Cách 1 - Bước 3

### Bước 5: Chuyển MetaMask sang Sepolia network

### Bước 6: Test donation với Sepolia ETH

---

## 🧪 Test Contract trực tiếp (không cần frontend)

Chạy script test:
```bash
cd contracts
npx hardhat run scripts/test-contract.js --network localhost
```

Script này sẽ:
- Deploy contract
- Tạo 2 donations
- Kiểm tra balance
- Test withdrawal

---

## 🔥 Quick Commands

**Start local blockchain:**
```bash
cd contracts && npx hardhat node
```

**Deploy to local:**
```bash
cd contracts && npx hardhat run scripts/deploy.js --network localhost
```

**Run tests:**
```bash
cd contracts && npx hardhat test
cd contracts && npx hardhat run scripts/test-contract.js --network localhost
```

**Start frontend:**
```bash
cd gofundme && npm start
```

---

## ⚠️ LƯU Ý QUAN TRỌNG

1. **Hardhat node phải chạy liên tục** khi test local
2. Mỗi lần restart hardhat node → **phải deploy lại contract** → **update contract address mới**
3. MetaMask phải kết nối đúng network (Hardhat Local hoặc Sepolia)
4. Nếu transaction bị stuck → MetaMask Settings → Advanced → Clear activity tab data

---

## 🐛 Troubleshooting

**Nonce too high error:**
- MetaMask → Settings → Advanced → Clear activity tab data

**Contract not found:**
- Kiểm tra contract address trong utilFunctions.js
- Đảm bảo đã deploy contract

**Insufficient funds:**
- Đảm bảo account có ETH (check balance trong MetaMask)

**Cannot connect to localhost:8545:**
- Kiểm tra hardhat node đang chạy
- Restart hardhat node
