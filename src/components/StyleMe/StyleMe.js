// src/components/StyleMe/StyleMe.js
import React, { useState } from 'react';
import './StyleMe.css';
import { Player } from '@lottiefiles/react-lottie-player';
import Swal from 'sweetalert2';
import aiStylist from '../animations/aiStylist.json';
import menAnim from '../animations/men.json';
import womenAnim from '../animations/women.json';
import kidsAnim from '../animations/kids.json';
import outfitCombos from '../data/outfitCombos';

const StyleMe = () => {
  const [selectedCategory, setSelectedCategory] = useState('Any');
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [mood, setMood] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [complimentText, setComplimentText] = useState('');

  const getAnimation = () => {
    switch (selectedCategory) {
      case 'Men': return menAnim;
      case 'Women': return womenAnim;
      case 'Kids': return kidsAnim;
      default: return aiStylist;
    }
  };

  const speak = (text) => {
    const synth = window.speechSynthesis;
    synth.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    synth.speak(utter);
  };

  const handleVoiceMood = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.start();
    setIsListening(true);

    recognition.onresult = function (event) {
      const transcript = event.results[0][0].transcript;
      setIsListening(false);
      setMood(transcript);

      let detectedMood = '';
      let compliment = '';

      const moodMap = [
        { keyword: 'happy', mood: 'happy', compliment: "You’re glowing today! Let's match your energy with bold style!" },
        { keyword: 'sad', mood: 'sad', compliment: "A cozy fit might brighten your day ☀️" },
        { keyword: 'confident', mood: 'confident', compliment: "Confidence looks good on you 😎 Here's something bold!" },
        { keyword: 'tired', mood: 'tired', compliment: "Let’s keep it chill and comfy today 💤" },
        { keyword: 'relaxed', mood: 'relaxed', compliment: "You deserve comfort and cool vibes 🌿" },
        { keyword: 'excited', mood: 'excited', compliment: "Let’s celebrate your vibe with something fabulous! 💃" },
        { keyword: 'lazy', mood: 'lazy', compliment: "No worries! We’ve got stylish-yet-easy outfits just for you 👕" },
      ];

      for (let entry of moodMap) {
        if (transcript.toLowerCase().includes(entry.keyword)) {
          detectedMood = entry.mood;
          compliment = entry.compliment;
          break;
        }
      }

      if (detectedMood) {
        setMood(detectedMood);
        setComplimentText(compliment);
        Swal.fire('Mood Detected 🎯', `${compliment}`, 'info');
        speak(compliment);
      } else {
        compliment = "Let's pick something stylish anyway! 😍";
        setComplimentText(compliment);
        Swal.fire('Mood Not Clearly Detected', `${compliment}`, 'info');
        speak(compliment);
      }

      generateSuggestion();
    };

    recognition.onerror = function () {
      Swal.fire('Oops!', 'Couldn\'t hear you clearly. Try again.', 'error');
      setIsListening(false);
    };
  };

  const generateSuggestion = () => {
    setLoading(true);
    setSuggestions([]);

    setTimeout(() => {
      let combos = selectedCategory === 'Any'
        ? outfitCombos
        : outfitCombos.filter(item => item.category === selectedCategory);

      const lowerMood = mood.toLowerCase();
      if (lowerMood.includes('happy') || lowerMood.includes('confident') || lowerMood.includes('excited')) {
        combos = combos.filter(item => item.vibe === 'bold' || item.vibe === 'stylish');
      } else if (lowerMood.includes('tired') || lowerMood.includes('sad') || lowerMood.includes('lazy') || lowerMood.includes('relaxed')) {
        combos = combos.filter(item => item.vibe === 'relaxed' || item.vibe === 'comfortable');
      }

      const selected = [];
      const usedIndexes = new Set();
      while (selected.length < 3 && selected.length < combos.length) {
        const index = Math.floor(Math.random() * combos.length);
        if (!usedIndexes.has(index)) {
          selected.push(combos[index]);
          usedIndexes.add(index);
        }
      }

      setSuggestions(selected);
      setLoading(false);

      const first = selected[0];
      if (first) {
        const msg = `Try ${first.top.name}, with ${first.bottom.name}, and ${first.shoes.name}. It’s a great ${first.category} look!`;
        speak(msg);
      }
    }, 3000);
  };

  const saveFavorite = (combo) => {
    const updated = [...favorites, combo];
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
    Swal.fire('Saved!', 'Outfit added to favorites.', 'success');
  };

  const handleBuyNow = (combo) => {
    Swal.fire({
      title: 'Proceed to Checkout?',
      html: `
        <strong>Top:</strong> ${combo.top.name} (Rs ${combo.top.price})<br/>
        <strong>Bottom:</strong> ${combo.bottom.name} (Rs ${combo.bottom.price})<br/>
        <strong>Shoes:</strong> ${combo.shoes.name} (Rs ${combo.shoes.price})<br/><br/>
        Total: <strong>Rs ${combo.top.price + combo.bottom.price + combo.shoes.price}</strong>
      `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Buy Now',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#00cec9',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: '🎉 Order Placed!',
          text: 'Your outfit is on its way!',
          icon: 'success',
          confirmButtonColor: '#00cec9',
        });
      }
    });
  };

  const handleImageClick = (item, pieceType) => {
    const piece = item[pieceType];

    Swal.fire({
      title: `${pieceType.charAt(0).toUpperCase() + pieceType.slice(1)}: ${piece.name}`,
      html: `
        <img src="${piece.image}" alt="${piece.name}" style="width: 250px; height: 250px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.2);"><br/><br/>
        <strong>Price:</strong> Rs ${piece.price}<br/>
        <strong>Vibe:</strong> ${item.vibe || 'N/A'}
      `,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: '🔊 Speak',
      denyButtonText: '❤️ Add to Wishlist',
      cancelButtonText: '🛒 Buy This Item',
      confirmButtonColor: '#6c5ce7',
      denyButtonColor: '#ff7675',
      cancelButtonColor: '#00cec9',
    }).then((result) => {
      if (result.isConfirmed) {
        const msg = `${pieceType} is ${piece.name}, Rs ${piece.price}, perfect for a ${item.vibe} look.`;
        speak(msg);
      } else if (result.isDenied) {
        const updated = [...favorites, { name: piece.name, price: piece.price, image: piece.image }];
        setFavorites(updated);
        localStorage.setItem("favorites", JSON.stringify(updated));
        Swal.fire('Saved!', 'Item added to wishlist ❤️', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          icon: 'success',
          title: '🛒 Purchase Confirmed',
          text: `You’ve bought ${piece.name} for Rs ${piece.price}.`,
          confirmButtonColor: '#00cec9'
        });
      }
    });
  };

  return (
    <div className="styleme-container">
      <h1 className="styleme-heading">👗 AI Fashion Stylist</h1>

      <div className="styleme-controls">
        <label>Select Category:</label>
        <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
          <option value="Any">Any</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Kids">Kids</option>
        </select>
        <button className="styleme-button" onClick={generateSuggestion}>✨ Suggest Outfit</button>
        <button className="styleme-button voice" onClick={handleVoiceMood}>🎤 Speak Your Mood</button>
      </div>

      {isListening && (
        <div className="mic-anim-container">
          <div className="mic-pulse"></div>
          <p>🎙️ Listening for your mood...</p>
        </div>
      )}

      {complimentText && (
        <div className="compliment-bubble">
          💬 {complimentText}
        </div>
      )}

      {loading && (
        <div className="styleme-loader">
          <Player autoplay loop src={getAnimation()} style={{ height: '220px', width: '220px' }} />
          <p>AI is selecting a stylish combo for you...</p>
        </div>
      )}

      {!loading && suggestions.length > 0 && (
        <div className="styleme-results">
          {suggestions.map((item, index) => (
            <div className="styleme-card" key={index}>
              <h3>🔥 {item.category} Collection</h3>
              <div className="styleme-images">
                <div onClick={() => handleImageClick(item, 'top')} style={{ cursor: 'pointer' }}>
                  <img src={item.top.image} alt={item.top.name} />
                  <p><strong>Top:</strong> {item.top.name}</p>
                  <p>Rs {item.top.price}</p>
                </div>
                <div onClick={() => handleImageClick(item, 'bottom')} style={{ cursor: 'pointer' }}>
                  <img src={item.bottom.image} alt={item.bottom.name} />
                  <p><strong>Bottom:</strong> {item.bottom.name}</p>
                  <p>Rs {item.bottom.price}</p>
                </div>
                <div onClick={() => handleImageClick(item, 'shoes')} style={{ cursor: 'pointer' }}>
                  <img src={item.shoes.image} alt={item.shoes.name} />
                  <p><strong>Shoes:</strong> {item.shoes.name}</p>
                  <p>Rs {item.shoes.price}</p>
                </div>
              </div>
              <div className="ai-score">✨ AI Match Score: {item.matchScore || Math.floor(Math.random() * 20 + 80)}%</div>
              {item.comment && <p className="ai-comment">💡 {item.comment}</p>}
              <div className="styleme-actions">
                <button onClick={() => saveFavorite(item)} className="save-btn">❤️ Save</button>
                <button onClick={() => handleBuyNow(item)} className="buy-btn">🛒 Buy Now</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StyleMe;
