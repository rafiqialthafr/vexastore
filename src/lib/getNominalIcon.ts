/**
 * Helper untuk menentukan icon nominal mata uang in-game.
 * Arsitektur Hybrid:
 * 1. Khusus Mobile Legends: Hardcoded Tier 3D Assets (dm-single, dm-pile, dm-bag, dm-briefcase, dm-barrel, weekly-pass)
 * 2. Untuk 99+ Aplikasi & Game Lainnya: Dinamis Admin-Ready (adminIconUrl dari props / database)
 */
export function getNominalIcon(
  gameSlug: string,
  productName: string,
  adminIconUrl?: string | null
): string | null {
  const normalizedSlug = (gameSlug || '').toLowerCase();
  const normalizedName = (productName || '').toLowerCase();

  // Logika Prioritas 1: Khusus Mobile Legends (Hardcoded Tier 3D Assets)
  if (normalizedSlug === 'mobile-legends' || normalizedSlug === 'mlbb') {
    // Jika nama produk mengandung "weekly" atau "pass"
    if (normalizedName.includes('weekly') || normalizedName.includes('pass')) {
      return '/icons/mlbb/weekly-pass.png';
    }

    // Ekstrak angka nominal dari productName
    const match = productName.match(/\d+/);
    const nominal = match ? parseInt(match[0], 10) : 0;

    if (nominal >= 2000) return '/icons/mlbb/dm-barrel.png';
    if (nominal >= 700) return '/icons/mlbb/dm-briefcase.png';
    if (nominal >= 275) return '/icons/mlbb/dm-bag.png';
    if (nominal >= 70) return '/icons/mlbb/dm-pile.png';
    if (nominal > 0) return '/icons/mlbb/dm-single.png';

    if (adminIconUrl && adminIconUrl.trim() !== '') {
      return adminIconUrl;
    }

    return '/icons/mlbb/dm-single.png';
  }

  // Logika Prioritas 2: Untuk 99+ Aplikasi & Game Lainnya (Dinamis dari Panel Admin)
  if (adminIconUrl && adminIconUrl.trim() !== '') {
    return adminIconUrl;
  }

  return null;
}

