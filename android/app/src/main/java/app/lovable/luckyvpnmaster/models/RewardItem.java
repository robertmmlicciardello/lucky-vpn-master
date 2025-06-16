
package app.lovable.luckyvpnmaster.models;

public class RewardItem {
    public String title;
    public String description;
    public int points;
    public int iconResource;

    public RewardItem(String title, String description, int points, int iconResource) {
        this.title = title;
        this.description = description;
        this.points = points;
        this.iconResource = iconResource;
    }
}
