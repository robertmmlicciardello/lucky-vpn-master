
package app.lovable.luckyvpnmaster;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;
import java.util.ArrayList;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        // Initialize Capacitor plugins
        this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
            // Add any additional plugins here
        }});
    }
}
