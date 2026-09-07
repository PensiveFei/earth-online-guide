// 线性图标集（24x24，stroke 风格，currentColor 继承主题色）
// 供 AppIcon / ArticleCard / HomeFeatures 共用
export const ICONS: Record<string, string> = {
  // ---- 板块级 ----
  'bowl-rice': '<path d="M4 12h16v1a8 8 0 0 1-16 0v-1z"/><path d="M7 12c0-3 2.2-5 5-5s5 2 5 5"/><path d="M9.5 9.6h.01M12 9.2h.01M14.5 9.6h.01"/>',
  train: '<rect x="5" y="3" width="14" height="14" rx="3"/><path d="M5 10h14"/><path d="M9 13.5h.01M15 13.5h.01"/><path d="M8 17l-1.5 3M16 17l1.5 3"/>',
  house: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M9.5 21v-6h5v6"/>',
  'medical-case': '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M12 11v6M9 14h6"/>',
  cart: '<circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l2.7 11.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6L21 7H5.5"/>',
  basket: '<path d="m5 11 4-7M19 11l-4-7"/><path d="M4 11h16"/><path d="M5.5 11l1.6 8.2a2 2 0 0 0 2 1.6h5.8a2 2 0 0 0 2-1.6L18.5 11"/><path d="M9 15v3M15 15v3"/>',
  'shield-bag': '<path d="M12 2 20 5v6c0 5.5-3.5 9-8 11-4.5-2-8-5.5-8-11V5z"/><path d="M9.3 10.5h5.4l.7 4.6H8.6z"/><path d="M10.6 10.5a1.4 1.4 0 0 1 2.8 0"/>',
  // ---- 出行交通 ----
  plane: '<path d="M17.8 19.2 16 11l3.5-3.5a2.12 2.12 0 0 0-3-3L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.3 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>',
  ticket: '<path d="M3 9V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a3 3 0 0 0 0 6v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a3 3 0 0 0 0-6z"/><path d="M13 5v2M13 11v2M13 17v2"/>',
  metro: '<rect x="5" y="3" width="14" height="15" rx="3"/><path d="M5 9h14"/><path d="M12 3v6"/><path d="M9 13h.01M15 13h.01"/><path d="M8 18l-2 3M16 18l2 3"/>',
  bus: '<rect x="4" y="3" width="16" height="15" rx="3"/><path d="M4 10h16"/><path d="M8 14h.01M16 14h.01"/><path d="M7 18v2M17 18v2"/>',
  taxi: '<path d="M5 11 6.6 6.6A2 2 0 0 1 8.5 5h7a2 2 0 0 1 1.9 1.6L19 11"/><rect x="3" y="11" width="18" height="6" rx="2"/><path d="M7 14h.01M17 14h.01"/><path d="M6 17v2.5M18 17v2.5"/><path d="M10 5V3.5h4V5"/>',
  hotel: '<rect x="5" y="3" width="14" height="18" rx="1"/><path d="M9 7h.01M12 7h.01M15 7h.01M9 11h.01M12 11h.01M15 11h.01"/><path d="M10 21v-4h4v4"/>',
  luggage: '<rect x="6" y="8" width="12" height="12" rx="2"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/><path d="M9 20v1.5M15 20v1.5"/>',
  'id-card': '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8.5" cy="11" r="2"/><path d="M6 16.5c.5-1.8 1.5-2.5 2.5-2.5s2 .7 2.5 2.5"/><path d="M14.5 9h4M14.5 13h4"/>',
  shield: '<path d="M12 2 20 5v6c0 5.5-3.5 9-8 11-4.5-2-8-5.5-8-11V5z"/>',
  // ---- 饮食做饭 ----
  'rice-cooker': '<rect x="5" y="7" width="14" height="12" rx="3"/><path d="M5 11h14"/><path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7"/><path d="M12 15h.01"/>',
  noodles: '<path d="M4 13h16a8 8 0 0 1-16 0z"/><path d="M8 21h8"/><path d="M14 3l3.5 7M18.5 3 21 10"/><path d="M9 8c0 2-1 3-1 5M12 8c0 2-1 3-1 5"/>',
  'fried-egg': '<path d="M9 4.5C6 4.5 4.5 6.6 4.8 9c-1.3 1.2-1.6 3.2-.4 4.8.8 1.1 2.2 1.4 3.3 1 .7 2 2.6 3.2 4.8 3.2s4-1.2 4.8-3.2c1.1.4 2.5.1 3.3-1 1.2-1.6.9-3.6-.4-4.8.3-2.4-1.2-4.5-4.2-4.5-1 0-2 .4-3 1.1-1-.7-2-1.1-3-1.1z"/><circle cx="12" cy="12.5" r="3"/>',
  'steam-bowl': '<path d="M4 13h16a8 8 0 0 1-16 0z"/><path d="M8 21h8"/><path d="M9.5 4c-.8 1 .8 1.8 0 2.8-.6.8-.6 1.4 0 2.2"/><path d="M14.5 4c-.8 1 .8 1.8 0 2.8-.6.8-.6 1.4 0 2.2"/>',
  dumpling: '<path d="M12 5c5 0 9 4 9 9v1.5H3V14c0-5 4-9 9-9z"/><path d="M8 8l1.3 2M12 7.5V10M16 8l-1.3 2"/>',
  greens: '<path d="M12 22v-6"/><path d="M12 16c0-5-3-8-7.5-8C4.5 13 7.5 16 12 16z"/><path d="M12 16c0-5 3-8 7.5-8 0 5-3 8-7.5 8z"/>',
  congee: '<path d="M4 12h16a8 8 0 0 1-16 0z"/><path d="M8 20h8"/><path d="M7 8.5c1.5-1.2 3.5-1.2 5 0s3.5 1.2 5 0"/>',
  pot: '<path d="M4 10h16v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5v-5z"/><path d="M2 12h2M20 12h2"/><path d="M8 10c0-2.2 1.8-3.5 4-3.5s4 1.3 4 3.5"/><path d="M12 4v1"/>',
  knife: '<path d="M4.5 19.5 14 10l4.5-4.5c1 2.5 0 5-2 7L8 21z"/><path d="M4.5 19.5 6 21l2-.5"/><path d="M14 10l2.5 2.5"/>',
  stove: '<rect x="3" y="5" width="18" height="15" rx="2"/><circle cx="8.5" cy="11" r="2.3"/><circle cx="15.5" cy="11" r="2.3"/><path d="M6 16.5h.01M10 16.5h.01M14 16.5h.01M18 16.5h.01"/>',
  fridge: '<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M6 10h12"/><path d="M9 5v3M9 13v4"/>',
  // ---- 租房搬家 ----
  'home-search': '<path d="M3 10.5 11 4l7 6.5"/><path d="M5 9.5V19h6"/><circle cx="16" cy="15.5" r="3.5"/><path d="m18.5 18 2.5 2.5"/>',
  'clipboard-check': '<rect x="5" y="4" width="14" height="18" rx="2"/><path d="M9 4V2h6v2"/><path d="m9 13.5 2 2 4-4"/>',
  'file-shield': '<path d="M6 2h8l4 4v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"/><path d="M14 2v4h4"/><path d="M12 11.5 15 12.5v2c0 2-1.2 3-3 3.8-1.8-.8-3-1.8-3-3.8v-2z"/>',
  wallet: '<path d="M3 7a2 2 0 0 1 2-2h13v3"/><path d="M3 7v11a2 2 0 0 0 2 2h14.5a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 19.5 10H5a2 2 0 0 1-2-2z"/><path d="M16.5 14.5h.01"/>',
  truck: '<path d="M14 16V6a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h1.5"/><path d="M14 9h3.6a1 1 0 0 1 .8.4l3 3.6a1 1 0 0 1 .2.6V16h-2"/><circle cx="7" cy="17.5" r="2"/><circle cx="16.5" cy="17.5" r="2"/><path d="M9 17.5h5.5"/>',
  people: '<circle cx="9" cy="8" r="3"/><path d="M3.5 20c.6-3.5 2.7-5 5.5-5s4.9 1.5 5.5 5"/><circle cx="17" cy="9" r="2.5"/><path d="M15.8 15.2c2.4.5 4 2 4.7 4.8"/>',
  'droplet-bolt': '<path d="M8.5 21A5.5 5.5 0 0 1 3 15.5c0-1.6.8-3 2.3-4.3S8 7.6 8.5 5.3c.5 2.3 1.7 4 3.2 5.4"/><path d="M14.5 21a5.5 5.5 0 0 0 3.5-9.7"/><path d="M16.5 3 13 9.5h3L13.5 15l5-6.5h-3z"/>',
  // ---- 就医问诊 ----
  'calendar-plus': '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 2v4M16 2v4M3 10h18"/><path d="M12 13.5v5M9.5 16h5"/>',
  'shield-cross': '<path d="M12 2 20 5v6c0 5.5-3.5 9-8 11-4.5-2-8-5.5-8-11V5z"/><path d="M12 8.5v6M9 11.5h6"/>',
  pill: '<path d="M10.5 20.5 3.5 13.5a4.95 4.95 0 1 1 7-7l7 7a4.95 4.95 0 1 1-7 7z"/><path d="m8.5 8.5 7 7"/>',
  'clipboard-heart': '<rect x="5" y="4" width="14" height="18" rx="2"/><path d="M9 4V2h6v2"/><path d="M12 17.5s-3.2-2-3.2-4c0-1 .8-1.8 1.7-1.8.6 0 1.2.3 1.5.9.3-.6.9-.9 1.5-.9.9 0 1.7.8 1.7 1.8 0 2-3.2 4-3.2 4z"/>',
  // ---- 购物防骗 ----
  bag: '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>',
  handshake: '<path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/><path d="m3 4 1.17.15a2 2 0 0 1 1.41-.24l.47-.28a5.79 5.79 0 0 1 7.07.86l2.8 2.81a1 1 0 1 1-3 3l-.86-.86a3 3 0 0 0-4.24 0L4.5 13.5a1 1 0 1 0 3 3L10 14"/>',
  'phone-alert': '<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M12 7v5"/><path d="M12 15.5h.01"/>',
  gavel: '<path d="m14 12-8.5 8.5a2.12 2.12 0 1 1-3-3L11 9"/><path d="m15 13 6-6"/><path d="m9 7 6-6"/><path d="m10 8 7 7"/><path d="m21 10-7-7"/>',
  'truck-question': '<path d="M13 15V6H2v9h2"/><path d="M13 9h3.4l2.6 2.6V15h-1.5"/><circle cx="6.5" cy="17" r="1.8"/><circle cx="15" cy="17" r="1.8"/><path d="M8.3 17h4.9"/><path d="M18.8 4.2a1.3 1.3 0 0 1 2 .9c0 .8-1 .9-1 1.7"/><path d="M19.8 8.2h.01"/>',
  // ---- 日常家务 ----
  shirt: '<path d="M20.4 3.5 16 2a4 4 0 0 1-8 0L3.6 3.5a2 2 0 0 0-1.3 2.2l.6 3.5a1 1 0 0 0 1 .8H6v9a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-9h2.1a1 1 0 0 0 1-.8l.6-3.5a2 2 0 0 0-1.3-2.2z"/>',
  underwear: '<path d="M4 5h16a1 1 0 0 1 1 1v2c0 6-3 10-6.5 11-.7.2-1.1-.3-1.3-1-.3-.9-.8-1.5-1.2-1.5s-.9.6-1.2 1.5c-.2.7-.6 1.2-1.3 1C6 18 3 14 3 8V6a1 1 0 0 1 1-1z"/><path d="M3 8h18"/>',
  mop: '<path d="M13 2h-2v11h2z"/><path d="M12 13c-3.5 0-5 2.8-5 6h10c0-3.2-1.5-6-5-6z"/><path d="M9.5 19v-3M12 19v-4M14.5 19v-3"/><path d="M5 21h14"/>',
  ac: '<rect x="3" y="4" width="18" height="9" rx="2"/><path d="M3 10h18"/><path d="M7 7h4"/><path d="M17 7h.01"/><path d="M7 16.5c.6-1.2 1.4-1.2 2 0M11 18.5c.6-1.2 1.4-1.2 2 0M15 16.5c.6-1.2 1.4-1.2 2 0"/>',
  washer: '<rect x="4" y="2" width="16" height="20" rx="2"/><circle cx="12" cy="13" r="5"/><path d="M8.5 13a3.5 3.5 0 0 1 7 0"/><path d="M7 5h3"/><path d="M17 5h.01"/>',
  leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10z"/><path d="M2 21c0-3 1.9-5.4 5.1-6C9.5 14.5 12 13 13 12"/>',
  toilet: '<path d="M6 3h4v7H6z"/><path d="M10 8h4a5 5 0 0 1 5 5c0 3-2 5-5 5H9a4 4 0 0 1-4-4V8"/><path d="M6 14h4"/>',
  plunger: '<path d="M13 2h-2v10h2z"/><path d="M12 12c-3.8 0-6 2.6-6 6h12c0-3.4-2.2-6-6-6z"/><path d="M4 21h16"/>',
  key: '<circle cx="8" cy="16" r="4"/><path d="M11 13 20 4"/><path d="M15.5 8.5 18 11M18 5.5 20.5 8"/>',
  'smart-lock': '<rect x="7" y="3" width="10" height="18" rx="2"/><path d="M10 7h.01M12 7h.01M14 7h.01M10 10h.01M12 10h.01M14 10h.01"/><path d="M12 15v3"/>'
}
