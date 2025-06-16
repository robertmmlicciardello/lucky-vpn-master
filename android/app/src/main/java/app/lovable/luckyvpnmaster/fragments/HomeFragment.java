
package app.lovable.luckyvpnmaster.fragments;

import android.content.Intent;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import androidx.fragment.app.Fragment;
import app.lovable.luckyvpnmaster.R;
import app.lovable.luckyvpnmaster.VPNService;
import app.lovable.luckyvpnmaster.auth.AuthManager;
import app.lovable.luckyvpnmaster.models.User;
import app.lovable.luckyvpnmaster.models.Server;
import app.lovable.luckyvpnmaster.api.ServerManager;

public class HomeFragment extends Fragment {
    private TextView tvConnectionStatus, tvUserName, tvUserPlan, tvCurrentServer;
    private Button btnConnect;
    private ImageView ivConnectionIcon;
    private AuthManager authManager;
    private ServerManager serverManager;
    private boolean isConnected = false;
    private Server currentServer;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_home, container, false);
        
        authManager = new AuthManager(getContext());
        serverManager = new ServerManager(getContext());
        
        initViews(view);
        setupClickListeners();
        loadUserData();
        loadBestServer();
        
        return view;
    }

    private void initViews(View view) {
        tvConnectionStatus = view.findViewById(R.id.tv_connection_status);
        tvUserName = view.findViewById(R.id.tv_user_name);
        tvUserPlan = view.findViewById(R.id.tv_user_plan);
        tvCurrentServer = view.findViewById(R.id.tv_current_server);
        btnConnect = view.findViewById(R.id.btn_connect);
        ivConnectionIcon = view.findViewById(R.id.iv_connection_icon);
    }

    private void setupClickListeners() {
        btnConnect.setOnClickListener(v -> {
            if (isConnected) {
                disconnectVPN();
            } else {
                connectVPN();
            }
        });
    }

    private void loadUserData() {
        User user = authManager.getCurrentUser();
        if (user != null) {
            tvUserName.setText("Welcome, " + user.name);
            tvUserPlan.setText(user.plan.toUpperCase() + " Plan");
        }
    }

    private void loadBestServer() {
        serverManager.getBestServer(new ServerManager.ServerCallback() {
            @Override
            public void onSuccess(Server server) {
                if (getActivity() != null) {
                    getActivity().runOnUiThread(() -> {
                        currentServer = server;
                        tvCurrentServer.setText(server.country + " - " + server.city);
                    });
                }
            }

            @Override
            public void onError(String error) {
                if (getActivity() != null) {
                    getActivity().runOnUiThread(() -> {
                        tvCurrentServer.setText("No server available");
                    });
                }
            }
        });
    }

    private void connectVPN() {
        if (currentServer == null) {
            loadBestServer();
            return;
        }

        Intent intent = new Intent(getContext(), VPNService.class);
        intent.putExtra("server_ip", currentServer.ip);
        intent.putExtra("server_port", currentServer.port);
        intent.putExtra("server_config", currentServer.configFile);
        
        getContext().startService(intent);
        
        updateConnectionStatus(true);
    }

    private void disconnectVPN() {
        Intent intent = new Intent(getContext(), VPNService.class);
        getContext().stopService(intent);
        
        updateConnectionStatus(false);
    }

    private void updateConnectionStatus(boolean connected) {
        isConnected = connected;
        
        if (connected) {
            tvConnectionStatus.setText("CONNECTED");
            tvConnectionStatus.setTextColor(getResources().getColor(android.R.color.holo_green_dark));
            btnConnect.setText("DISCONNECT");
            btnConnect.setBackgroundColor(getResources().getColor(android.R.color.holo_red_dark));
            ivConnectionIcon.setImageResource(R.drawable.ic_shield_check);
        } else {
            tvConnectionStatus.setText("DISCONNECTED");
            tvConnectionStatus.setTextColor(getResources().getColor(android.R.color.holo_red_dark));
            btnConnect.setText("CONNECT");
            btnConnect.setBackgroundColor(getResources().getColor(android.R.color.holo_green_dark));
            ivConnectionIcon.setImageResource(R.drawable.ic_shield_off);
        }
    }
}
