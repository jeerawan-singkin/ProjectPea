import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

// ✅ Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyB-W0d0AB7O6Lz2K8jKQ-OHv5zDEUFmECQ",
  authDomain: "projectpea-24217.firebaseapp.com",
  projectId: "projectpea-24217",
  storageBucket: "projectpea-24217.appspot.com",
  messagingSenderId: "336666334550",
  appId: "1:336666334550:web:e5fa452735744f8c2632f7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) return alert("กรุณากรอกข้อมูลให้ครบ");

    try {
      const q = query(
        collection(db, "admin"),
        where("username", "==", username),
        where("password", "==", password)
      );
      const snap = await getDocs(q);

      if (!snap.empty) {
        const user = snap.docs[0].data();
        if (user.role === "admin") {
          alert("✅ ยินดีต้อนรับแอดมิน");
          localStorage.setItem("loggedIn", "true");
          navigate("/dashboard");
        } else {
          alert("✅ เข้าสู่ระบบได้ แต่ไม่ใช่แอดมิน");
        }
      } else {
        alert("❌ Username หรือ Password ไม่ถูกต้อง");
      }
    } catch (err) {
      console.error(err);
      alert("❌ เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
    }
  };

  return (
    <div className="login-wrapper">
      <form className="login-card" onSubmit={handleLogin}>
        <h2>เข้าสู่ระบบแอดมิน</h2>
        <p className="subtitle">ระบบแจ้งซ่อมไฟฟ้าส่วนภูมิภาค</p>

        <div className="form-group">
          <label>ชื่อผู้ใช้</label>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>รหัสผ่าน</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn-login">เข้าสู่ระบบ</button>
      </form>
    </div>
  );
}
