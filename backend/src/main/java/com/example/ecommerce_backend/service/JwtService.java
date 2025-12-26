package com.example.ecommerce_backend.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.function.Function;

@Service
public class JwtService {

    // 🔑 Secret key (must be at least 256-bit)
    @Value("${jwt.secret}")
    private String SECRET_KEY;

    // ===============================
    // 1️⃣ Extract username (email)
    // ===============================
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    // ===============================
    // 2️⃣ Extract token expiration
    // ===============================
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    // ===============================
    // 3️⃣ Generic claim extractor
    // ===============================
    public <T> T extractClaim(
            String token,
            Function<Claims, T> claimsResolver
    ) {
        Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    // ===============================
    // 4️⃣ Generate JWT token
    // ===============================
    public String generateToken(UserDetails userDetails) {
        return Jwts.builder()
                .setSubject(userDetails.getUsername()) // email
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(
                        new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24)
                ) // 24 hours
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    // ===============================
    // 5️⃣ Validate token
    // ===============================
    public boolean isTokenValid(
            String token,
            UserDetails userDetails
    ) {
        final String username = extractUsername(token);
        return username.equals(userDetails.getUsername())
                && !isTokenExpired(token);
    }

    // ===============================
    // 6️⃣ Check expiration
    // ===============================
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // ===============================
    // 7️⃣ Parse all claims
    // ===============================
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // ===============================
    // 8️⃣ Convert secret to Key
    // ===============================
    private Key getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
