package app.lovable.luckyvpnmaster;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Intent;
import android.net.VpnService;
import android.os.Build;
import android.os.ParcelFileDescriptor;
import androidx.core.app.NotificationCompat;
import java.io.IOException;
import java.net.InetSocketAddress;
import java.nio.channels.DatagramChannel;

public class VPNService extends VpnService {
    private static final String CHANNEL_ID = "VPN_SERVICE_CHANNEL";
    private static final int NOTIFICATION_ID = 1;
    private ParcelFileDescriptor vpnInterface;
    private Thread vpnThread;
    private boolean isConnected = false;

    @Override
    public void onCreate() {
        super.onCreate();
        createNotificationChannel();
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        String action = intent.getAction();
        
        if ("CONNECT_VPN".equals(action)) {
            String serverIP = intent.getStringExtra("SERVER_IP");
            String serverPort = intent.getStringExtra("SERVER_PORT");
            connectVPN(serverIP, serverPort);
        } else if ("DISCONNECT_VPN".equals(action)) {
            disconnectVPN();
        }
        
        return START_STICKY;
    }

    private void connectVPN(String serverIP, String serverPort) {
        if (isConnected) return;
        
        Builder builder = new Builder();
        builder.setMtu(1500);
        builder.addAddress("10.0.0.2", 32);
        builder.addRoute("0.0.0.0", 0);
        builder.addDnsServer("8.8.8.8");
        builder.addDnsServer("8.8.4.4");
        builder.setSession("VPN Master");
        
        try {
            vpnInterface = builder.establish();
            isConnected = true;
            
            // Start foreground service
            startForeground(NOTIFICATION_ID, createNotification("Connected to VPN"));
            
            // Start VPN thread
            vpnThread = new Thread(new VPNRunnable(vpnInterface, serverIP, serverPort));
            vpnThread.start();
            
            // Notify web app about connection status
            sendBroadcast(new Intent("VPN_STATUS_CHANGED").putExtra("connected", true));
            
        } catch (Exception e) {
            e.printStackTrace();
            disconnectVPN();
        }
    }

    private void disconnectVPN() {
        if (!isConnected) return;
        
        try {
            if (vpnThread != null) {
                vpnThread.interrupt();
            }
            
            if (vpnInterface != null) {
                vpnInterface.close();
                vpnInterface = null;
            }
            
            isConnected = false;
            stopForeground(true);
            
            // Notify web app about disconnection
            sendBroadcast(new Intent("VPN_STATUS_CHANGED").putExtra("connected", false));
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel channel = new NotificationChannel(
                CHANNEL_ID,
                "VPN Service",
                NotificationManager.IMPORTANCE_LOW
            );
            channel.setDescription("VPN connection status");
            
            NotificationManager manager = getSystemService(NotificationManager.class);
            manager.createNotificationChannel(channel);
        }
    }

    private Notification createNotification(String text) {
        Intent notificationIntent = new Intent(this, MainActivity.class);
        PendingIntent pendingIntent = PendingIntent.getActivity(
            this, 0, notificationIntent, PendingIntent.FLAG_IMMUTABLE
        );

        return new NotificationCompat.Builder(this, CHANNEL_ID)
            .setContentTitle("VPN Master")
            .setContentText(text)
            .setSmallIcon(R.drawable.ic_vpn)
            .setContentIntent(pendingIntent)
            .setOngoing(true)
            .build();
    }

    private class VPNRunnable implements Runnable {
        private ParcelFileDescriptor vpnInterface;
        private String serverIP;
        private String serverPort;

        public VPNRunnable(ParcelFileDescriptor vpnInterface, String serverIP, String serverPort) {
            this.vpnInterface = vpnInterface;
            this.serverIP = serverIP;
            this.serverPort = serverPort;
        }

        @Override
        public void run() {
            try {
                // VPN packet handling logic would go here
                // This is a simplified version - real implementation would need
                // proper packet routing and encryption
                
                DatagramChannel tunnel = DatagramChannel.open();
                tunnel.connect(new InetSocketAddress(serverIP, Integer.parseInt(serverPort)));
                
                // Keep connection alive
                while (!Thread.interrupted() && isConnected) {
                    // Handle VPN packets
                    Thread.sleep(1000);
                }
                
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    public void onDestroy() {
        disconnectVPN();
        super.onDestroy();
    }
}
