"use strict";

// Mapping prefix mã đơn → Group ID Telegram của kênh T3
const PAYMENT_CHANNEL_MAP = {
  "THUYPAY":   "-1003969257130",
  "LFPVN":   "-1003853177181",
  "N33PAY":   "-1003959794389",
  "SPPAY":   "-1003834154402",
  "WZ3PAY":   "-1003805307265",
  "JINDOR":   "-1003707539060",
  "HOYAPAY":   "-1003769429706",
  "AOPAY":   "-5201830589",
  "K8PAY":   "-1003202461748",
  "AFPVN":   "-1003884103210",
};

// Tập hợp tất cả Group ID của T3 (để nhận dạng tin nhắn từ nhóm T3)
const T3_GROUP_IDS = new Set(Object.values(PAYMENT_CHANNEL_MAP));

// Lấy Group ID của kênh T3 từ remarks (dựa vào prefix mã đơn)
function resolveChannelGroup(remarks) {
  if (!remarks) return null;
  const upper = remarks.toUpperCase().replace(/[^A-Z0-9]/g, "");
  const prefix = Object.keys(PAYMENT_CHANNEL_MAP)
    .sort((a, b) => b.length - a.length) // Khớp prefix dài trước
    .find(p => upper.startsWith(p));
  return prefix ? PAYMENT_CHANNEL_MAP[prefix] : null;
}

function isT3Group(chatId) {
  return T3_GROUP_IDS.has(String(chatId));
}

module.exports = { PAYMENT_CHANNEL_MAP, T3_GROUP_IDS, resolveChannelGroup, isT3Group };
