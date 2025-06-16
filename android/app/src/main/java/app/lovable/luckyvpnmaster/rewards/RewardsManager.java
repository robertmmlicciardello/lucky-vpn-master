
package app.lovable.luckyvpnmaster.rewards;

import android.content.Context;
import android.util.Log;
import org.json.JSONObject;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import app.lovable.luckyvpnmaster.auth.AuthManager;

public class RewardsManager {
    private static final String API_BASE_URL = "http://your-backend-url.com/api/v1";
    private Context context;
    private AuthManager authManager;

    public RewardsManager(Context context) {
        this.context = context;
        this.authManager = new AuthManager(context);
    }

    public interface RewardCallback {
        void onSuccess(int pointsEarned);
        void onError(String error);
    }

    public void addPoints(int points, String reason, RewardCallback callback) {
        new Thread(() -> {
            try {
                URL url = new URL(API_BASE_URL + "/rewards/add-points");
                HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                conn.setRequestMethod("POST");
                conn.setRequestProperty("Content-Type", "application/json");
                conn.setRequestProperty("Authorization", "Bearer " + authManager.getAccessToken());
                conn.setDoOutput(true);

                JSONObject json = new JSONObject();
                json.put("points", points);
                json.put("reason", reason);

                OutputStream os = conn.getOutputStream();
                os.write(json.toString().getBytes());
                os.flush();
                os.close();

                int responseCode = conn.getResponseCode();
                BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
                StringBuilder response = new StringBuilder();
                String line;
                while ((line = br.readLine()) != null) {
                    response.append(line);
                }
                br.close();

                JSONObject responseJson = new JSONObject(response.toString());
                if (responseCode == 200 && responseJson.getBoolean("success")) {
                    int pointsEarned = responseJson.getInt("points_earned");
                    callback.onSuccess(pointsEarned);
                } else {
                    callback.onError("Failed to add points");
                }

            } catch (Exception e) {
                Log.e("RewardsManager", "Error adding points", e);
                callback.onError("Network error");
            }
        }).start();
    }

    public void dailyCheckin(RewardCallback callback) {
        new Thread(() -> {
            try {
                URL url = new URL(API_BASE_URL + "/rewards/daily-checkin");
                HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                conn.setRequestMethod("POST");
                conn.setRequestProperty("Authorization", "Bearer " + authManager.getAccessToken());

                int responseCode = conn.getResponseCode();
                BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
                StringBuilder response = new StringBuilder();
                String line;
                while ((line = br.readLine()) != null) {
                    response.append(line);
                }
                br.close();

                JSONObject responseJson = new JSONObject(response.toString());
                if (responseCode == 200 && responseJson.getBoolean("success")) {
                    int pointsEarned = responseJson.getInt("points_earned");
                    callback.onSuccess(pointsEarned);
                } else {
                    String errorMessage = responseJson.optString("message", "Daily check-in failed");
                    callback.onError(errorMessage);
                }

            } catch (Exception e) {
                Log.e("RewardsManager", "Error with daily check-in", e);
                callback.onError("Network error");
            }
        }).start();
    }
}
