#version 330 core
out vec4 FragColor;

in VS_OUT {
    vec3 FragPos;
    vec3 Normal;
    vec2 TexCoords;
    vec3 TangentLightPos;
    vec3 TangentViewPos;
    vec3 TangentFragPos;
    mat3 TBN;
} fs_in;

struct DirLight {
    vec3 direction;
    vec3 ambient;
    vec3 diffuse;
    vec3 specular;
};

uniform sampler2D texture_diffuse;
uniform sampler2D texture_normal;
uniform samplerCube depthMap;

//uniform vec3 lightPos;
uniform vec3 viewPos;

uniform float far_plane;

#define MAX_DIR_LIGHTS 1
uniform int u_num_dir_lights = 0;
uniform DirLight dirLights[MAX_DIR_LIGHTS];

vec3 CalcDirLight(DirLight light, vec3 normal, vec3 color, vec3 viewDir);

int num_dir_lights = 0;

// array of offset direction for sampling
vec3 gridSamplingDisk[20] = vec3[]
(
vec3(1, 1,  1), vec3( 1, -1,  1), vec3(-1, -1,  1), vec3(-1, 1,  1),
vec3(1, 1, -1), vec3( 1, -1, -1), vec3(-1, -1, -1), vec3(-1, 1, -1),
vec3(1, 1,  0), vec3( 1, -1,  0), vec3(-1, -1,  0), vec3(-1, 1,  0),
vec3(1, 0,  1), vec3(-1,  0,  1), vec3( 1,  0, -1), vec3(-1, 0, -1),
vec3(0, 1,  1), vec3( 0, -1,  1), vec3( 0, -1, -1), vec3( 0, 1, -1)
);

float ShadowCalculation(vec3 fragPos, vec3 lightPosition)
{
    // get vector between fragment position and light position
    vec3 fragToLight = fragPos - lightPosition;
    // use the fragment to light vector to sample from the depth map
    // float closestDepth = texture(depthMap, fragToLight).r;
    // it is currently in linear range between [0,1], let's re-transform it back to original depth value
    // closestDepth *= far_plane;
    // now get current linear depth as the length between the fragment and light position
    float currentDepth = length(fragToLight);

    float shadow = 0.0;
    float bias = 1.0;
    int samples = 20;
    float viewDistance = length(viewPos - fragPos);
    float diskRadius = (1.0 + (viewDistance / far_plane)) / 25.0;
    for(int i = 0; i < samples; ++i)
    {
        float closestDepth = texture(depthMap, fragToLight + gridSamplingDisk[i] * diskRadius).r;
        closestDepth *= far_plane;   // undo mapping [0;1]
        if(currentDepth - bias > closestDepth)
        shadow += 1.0;
    }
    shadow /= float(samples);

    // display closestDepth as debug (to visualize depth cubemap)
    // FragColor = vec4(vec3(closestDepth / far_plane), 1.0);

    return shadow;
}

void main()
{
    // obtain normal from normal map in range [0,1]
    vec3 normal =  normalize(texture(texture_normal, fs_in.TexCoords).rgb * 2.0 - 1.0);
    vec3 color = texture(texture_diffuse, fs_in.TexCoords).rgb;
    vec3 viewDir = normalize(fs_in.TangentViewPos - fs_in.TangentFragPos);

    vec3 result = CalcDirLight(dirLights[0], normal, color, viewDir);
//
//    // phase 1: Diretional Lighting
//    for(int i = 0; i < num_dir_lights; i++)
//        result += CalcDirLight(dirLights[i], normal, color, viewDir);

    FragColor = vec4(result, 1.0);
}

vec3 CalcDirLight(DirLight light, vec3 normal, vec3 color, vec3 viewDir)
{
    vec3 lightColor = vec3(0.3);
    // ambient
    vec3 ambient = 0.3 * color;
    // diffuse
    vec3 lightDir = normalize(light.direction * fs_in.TBN - fs_in.TangentFragPos);
    float diff = max(dot(lightDir, normal), 0.0);
    vec3 diffuse = diff * lightColor;
    // specular
    vec3 reflectDir = reflect(-lightDir, normal);
    vec3 halfwayDir = normalize(lightDir + viewDir);
    float spec = pow(max(dot(normal, halfwayDir), 0.0), 32.0);

    vec3 specular = lightColor * spec;
    float shadow = ShadowCalculation(fs_in.FragPos, light.direction);

    return (ambient + (1.0 - shadow) * (diffuse + specular))*color;
}