import cron from 'node-cron';
import activationModel from '../models/activation.model';
import userModel from '../models/user.model';
// ... diğer gerekli modeller

export const setupCleanupJobs = () => {
    // Her gün gece yarısı çalışacak
    cron.schedule('0 0 * * *', async () => {
        try {
            // 24 saatten eski kayıtları sil
            const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

            await activationModel.deleteMany({
                expiresAt: { $lt: oneDayAgo }
            });

            // Süresi dolmuş şifre sıfırlama tokenlarını temizle
            await userModel.updateMany(
                {
                    resetPasswordToken: { $ne: null },
                    resetPasswordExpire: { $lt: new Date() }
                },
                {
                    $set: {
                        resetPasswordToken: null,
                        resetPasswordExpire: null
                    }
                }
            );

            // Diğer temizlik işlemleri...
            // - Eski log kayıtları
            // - Süresi dolmuş geçici dosyalar
            // - Kullanılmayan oturum kayıtları vs.

        } catch (error) {
            console.error('Temizlik işlemi sırasında hata:', error);
        }
    });

    // Saatlik temizlik için ayrı bir job
    cron.schedule('0 * * * *', async () => {
        try {
            // Daha sık temizlenmesi gereken veriler
            // Örnek: Geçici oturum kayıtları
        } catch (error) {
            console.error('Saatlik temizlik sırasında hata:', error);
        }
    });
}; 