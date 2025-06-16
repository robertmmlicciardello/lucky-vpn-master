
package app.lovable.luckyvpnmaster.models;

public class Server {
    public int id;
    public String name;
    public String country;
    public String city;
    public String ip;
    public String port;
    public String protocol;
    public String type; // free or premium
    public String status; // online, offline, maintenance
    public int load;
    public int users;
    public String configFile;
    public String provider;
    public String flagUrl;
}
